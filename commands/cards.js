const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cards")
    .setDescription("View your own or someone else's list of cards")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user whose cards you want to see")
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("name you want to search for")
    )
    .addStringOption((option) =>
      option.setName("group").setDescription("group you want to search for")
    )
    .addStringOption((option) =>
      option.setName("era").setDescription("era you want to search for")
    )
    .addStringOption((option) =>
      option.setName("tag").setDescription("tag you want to search for")
    )
    .addIntegerOption((option) =>
      option
        .setName("stars-upper-bound")
        .setDescription("upper bound for stars")
    )
    .addIntegerOption((option) =>
      option
        .setName("stars-lower-bound")
        .setDescription("lower bound for stars")
    )
    .addIntegerOption((option) =>
      option
        .setName("serial-upper-bound")
        .setDescription("upper bound for serial")
    )
    .addIntegerOption((option) =>
      option
        .setName("serial-lower-bound")
        .setDescription("lower bound for serial")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    if (user) {
      await interaction.reply(`${user.username}'s cards\ncard1 card2 card3`);
    } else {
      await interaction.reply(
        `${interaction.user.username}'s cards\ncard1 card2 card`
      );
    }
  },
};
