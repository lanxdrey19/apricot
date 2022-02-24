const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("drop")
    .setDescription("Spawn three cards and collect one if you wish!"),
  async execute(interaction) {
    await interaction.reply("Three cards spawned");
  },
};
