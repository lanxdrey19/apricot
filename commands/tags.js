const { SlashCommandBuilder } = require("@discordjs/builders");
const userInteractor = require("../use_cases/user_interactor");
const userController = require("../controllers/user_controller");

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
      try {
        const result = await userInteractor.executeGetUser(
          userController,
          user.id.toString()
        );
        await interaction.reply(`Tags for ${user.username}:\n${result.tags}`);
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
          `Tags for ${interaction.user.username}:\n${result.tags}`
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
