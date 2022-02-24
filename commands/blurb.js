const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blurb")
    .setDescription("set your blurb for your profile")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("set")
        .setDescription("set your blurb")
        .addStringOption((option) =>
          option
            .setName("blurb-description")
            .setDescription("write amazing things about you")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const description = interaction.options.getString("blurb-description");
    if (interaction.options.getSubcommand() === "set") {
      await interaction.reply(`Blurb update successfully to:\n${description}`);
    }
  },
};
