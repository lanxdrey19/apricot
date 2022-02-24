const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ult")
    .setDescription("set your ultimate bias to be displayed for your profile")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("set")
        .setDescription("set your ultimate bias from your cards")
        .addStringOption((option) =>
          option
            .setName("ult-bias")
            .setDescription("your bias from your list of cards")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const userBias = interaction.options.getString("ult-bias");
    if (interaction.options.getSubcommand() === "set") {
      await interaction.reply(
        `ultimate bias set successfully to:\n${userBias}`
      );
    }
  },
};
