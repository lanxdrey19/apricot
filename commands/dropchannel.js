const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const permissionInteractor = require("../use_cases/permission_interactor");
const permissionController = require("../controllers/permission_controller");
const dropChannelInteractor = require("../use_cases/dropchannel_interactor");
const dropChannelController = require("../controllers/dropchannel_controller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dropchannel")
    .setDescription("set the drop channel for this server")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("set")
        .setDescription("set the drop channel for this server")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("channel where the drops can occur")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const dropChannel = interaction.options.getChannel("channel");
    if (interaction.options.getSubcommand() === "set") {
      try {
        await permissionInteractor.executeCheckPermissions(
          permissionController,
          interaction.guild.id.toString(),
          interaction.user.id,
          interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR),
          [1, 0, 0, 1]
        );
        let requestBody = {
          serverId: interaction.guild.id.toString(),
          newDropChannel: dropChannel,
        };

        await dropChannelInteractor.executeUpdateDropChannel(
          dropChannelController,
          requestBody
        );
        await interaction.reply(`Drop channel set to:\n${dropChannel}`);
      } catch (error) {
        await interaction.reply({
          content: `${error.message}`,
          ephemeral: true,
        });
      }
    }
  },
};
