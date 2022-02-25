const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const serverInteractor = require("../use_cases/server_interactor");
const serverController = require("../controllers/server_controller");

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
        let requestBody = {
          newDropChannel: dropChannel,
          isAllowed: interaction.member.permissions.has(
            Permissions.FLAGS.ADMINISTRATOR
          ),
        };

        await serverInteractor.executeUpdateDropChannel(
          serverController,
          interaction.guild.id.toString(),
          requestBody
        );
        await interaction.reply(`Drop channel set to:\n${dropChannel}`);
      } catch (error) {
        await interaction.reply({
          content:
            "An error occurred. Only administrators can update the drop channel for the server",
          ephemeral: true,
        });
      }
    }
  },
};
