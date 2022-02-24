const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("find help"),
  async execute(interaction) {
    await interaction.reply("here is help");
  },
};
