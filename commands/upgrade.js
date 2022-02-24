const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upgrade")
    .setDescription("Upgrade a card's stars")
    .addStringOption((option) =>
      option
        .setName("card")
        .setDescription("The card to upgrade")
        .setRequired(true)
    ),
  async execute(interaction) {
    const string = interaction.options.getString("card");
    await interaction.reply(
      "The card: " + string + " was upgraded successfully. It now has 5 stars"
    );
  },
};
