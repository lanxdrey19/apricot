const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription(
      "this must be done by admins/moderators before playing the game"
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("setup")
        .setDescription("sets up an instance of the server")
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "setup") {
      await interaction.reply(
        `Server instance recorded, make sure to set a drop channel using:\n**/dropchannel set {channel_id}**`
      );
    }
  },
};
