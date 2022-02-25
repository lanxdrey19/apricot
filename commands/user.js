const { SlashCommandBuilder } = require("@discordjs/builders");
const userInteractor = require("../use_cases/user_interactor");
const userController = require("../controllers/user_controller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("users must do this to play the game")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("start")
        .setDescription("record an instance to play the game")
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "start") {
      try {
        await userInteractor.executeCreateUser(
          userController,
          interaction.user.id.toString()
        );
        await interaction.reply(
          `Welcome ${interaction.user.username}!\nYou may now start.\nGo to /help if you need help`
        );
      } catch (error) {
        await interaction.reply({
          content: `Error: You have already started the game.`,
          ephemeral: true,
        });
      }
    }
  },
};
