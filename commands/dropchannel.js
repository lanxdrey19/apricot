const { SlashCommandBuilder } = require("@discordjs/builders");

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
      await interaction.reply(`Drop channel set to:\n${dropChannel}`);
    }
  },
};
