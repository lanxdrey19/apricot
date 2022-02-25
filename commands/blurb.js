const { SlashCommandBuilder } = require("@discordjs/builders");
const userInteractor = require("../use_cases/user_interactor");
const userController = require("../controllers/user_controller");
const blurbInteractor = require("../use_cases/blurb_interactor");
const blurbController = require("../controllers/blurb_controller");

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
      try {
        await blurbInteractor.executeUpdateBlurb(
          blurbController,
          interaction.user.id.toString(),
          description
        );
        await interaction.reply(
          `Blurb update successfully to:\n${description}`
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
