const {
  SlashCommandBuilder,
  userMention,
  memberNicknameMention,
  channelMention,
  roleMention,
} = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const permissionInteractor = require("../use_cases/permission_interactor");
const permissionController = require("../controllers/permission_controller");
const serverInteractor = require("../use_cases/server_interactor");
const serverController = require("../controllers/server_controller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription(
      "this must be done by admins/moderators before playing the game"
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("setup")
        .setDescription("sets up an instance of the server")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("info")
        .setDescription("retrieves information of the server")
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "setup") {
      try {
        await permissionInteractor.executeCheckPermissions(
          permissionController,
          interaction.guild.id.toString(),
          interaction.user.id,
          interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR),
          [0, 0, 0, 1]
        );
        let requestBody = {
          serverId: interaction.guild.id.toString(),
        };
        await serverInteractor.executeCreateServer(
          serverController,
          requestBody
        );
        await interaction.reply(
          `Server instance for ${interaction.guild.name} recorded. Make sure to set a drop channel using:\n**/dropchannel set {channel_id}**`
        );
      } catch (error) {
        await interaction.reply({
          content: `${error.message}`,
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "info") {
      try {
        await permissionInteractor.executeCheckPermissions(
          permissionController,
          interaction.guild.id.toString(),
          interaction.user.id,
          interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR),
          [1, 0, 0, 0]
        );
      } catch (error) {
        await interaction.reply({
          content: `${error.message}`,
          ephemeral: true,
        });
      }
      let requestBody = {
        serverId: interaction.guild.id.toString(),
      };
      const server = await serverInteractor.executeGetServer(
        serverController,
        requestBody
      );
      let dropChannel;
      server.dropChannel
        ? (dropChannel = server.dropChannel)
        : (dropChannel = "**not set**");
      await interaction.reply(
        `Info for: ${interaction.guild.name}\nDrop channel: ${channelMention(
          dropChannel
        )}`
      );
    }
  },
};
