const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("burn")
    .setDescription("Burn a card to receive tokens")
    .addStringOption((option) =>
      option
        .setName("card")
        .setDescription("The card to burn")
        .setRequired(true)
    ),
  async execute(interaction) {
    const string = interaction.options.getString("card");
    await interaction.reply(
      "The card: " + string + " was burnt successfully. You received 15 tokens"
    );
  },
};
