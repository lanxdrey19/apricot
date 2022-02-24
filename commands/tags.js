const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tags")
    .setDescription("view all your tags or someone else's")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user whose profile you want to see")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    if (user) {
      await interaction.reply(`${user.username}'s cards:\n card1 card2 card3`);
    } else {
      await interaction.reply(
        `${interaction.user.username}'s cards:\n card1 card2 card3`
      );
    }
  },
};
