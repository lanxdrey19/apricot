const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gift")
    .setDescription("gift a card to another user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want to give the card to")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("card")
        .setDescription("The card you want to give to the user")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const card = interaction.options.getString("card");
    await interaction.reply(
      "The card(s): wers successfully gifted to " + user.username + ":\n" + card
    );
  },
};
