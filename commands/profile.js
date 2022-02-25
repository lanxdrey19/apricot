const { SlashCommandBuilder } = require("@discordjs/builders");
const userInteractor = require("../use_cases/user_interactor");
const userController = require("../controllers/user_controller");

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
      try {
        const result = await userInteractor.executeGetUser(
          userController,
          user.id.toString()
        );
        await interaction.reply(
          `Your username: ${user.username}\nBlurb: ${result.blurb}\nUlt: ${result.ultimate}\nTags: ${result.tags}\nTokens: ${result.tokens}`
        );
      } catch (error) {
        await interaction.reply({
          content: `This user has not registered in the game\nTo register they must use the command **/user start**.`,
          ephemeral: true,
        });
      }
    } else {
      try {
        const result = await userInteractor.executeGetUser(
          userController,
          interaction.user.id.toString()
        );
        await interaction.reply(
          `Your username: ${interaction.user.username}\nBlurb: ${result.blurb}\nUlt: ${result.ultimate}\nTags: ${result.tags}\nTokens: ${result.tokens}`
        );
      } catch (error) {
        await interaction.reply({
          content: `You have not registered in the game\nTo register you must use the command **/user start**.`,
          ephemeral: true,
        });
      }
    }
  },
};
