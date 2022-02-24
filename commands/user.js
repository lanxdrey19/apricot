const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("users must do this to play the game")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("start")
        .setDescription("record an instance to play the game")
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "start") {
      await interaction.reply(
        `Welcome. You may now start. go to /help if you need help`
      );
    }
  },
};
