const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
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
        let requestBody = {
          serverId: interaction.guild.id.toString(),
          isAllowed: interaction.member.permissions.has(
            Permissions.FLAGS.ADMINISTRATOR
          ),
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
          content:
            "An error occurred. You must be an administrator to execute this command or this command has already been executed by the administrator",
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "info") {
      try {
        const result = await serverInteractor.executeGetServer(
          serverController,
          interaction.guild.id.toString()
        );
        let dropChannel;
        result.dropChannel
          ? (dropChannel = result.dropChannel)
          : (dropChannel = "**not set**");
        await interaction.reply(
          `Info for: ${
            interaction.guild.name
          }\nDrop channel: ${interaction.guild.channels.cache.get(dropChannel)}`
        );
      } catch (error) {
        await interaction.reply({
          content: "An error occurred. Please try again later...",
          ephemeral: true,
        });
      }
    }
  },
};
