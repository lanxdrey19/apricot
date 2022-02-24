const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("View your own or someone else's profile")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user whose profile you want to see")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    if (user) {
      await interaction.reply(
        `Username: ${user.username}\nuser blurb here\nyour ult here`
      );
    } else {
      await interaction.reply(
        `Your username: ${interaction.user.username}\nmy blurb here\nyour ult here`
      );
    }
  },
};
