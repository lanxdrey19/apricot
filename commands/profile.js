const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const permissionInteractor = require("../use_cases/permission_interactor");
const permissionController = require("../controllers/permission_controller");
const profileInteractor = require("../use_cases/profile_interactor");
const profileController = require("../controllers/profile_controller");

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
    let finalUser;
    try {
      user ? (finalUser = user) : (finalUser = interaction.user);

      await permissionInteractor.executeCheckPermissions(
        permissionController,
        interaction.guild.id.toString(),
        finalUser.id,
        interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR),
        [0, 0, 0, 1]
      );
      let requestBody = {
        userId: finalUser.id.toString(),
      };
      const userRetrieved = await profileInteractor.executeGetUserProfile(
        profileController,
        requestBody
      );
      await interaction.reply(
        `Your username: ${finalUser.username}\nBlurb: ${userRetrieved.blurb}\nUlt: ${userRetrieved.ultimate}\nTags: ${userRetrieved.tags}\nTokens: ${userRetrieved.tokens}`
      );
    } catch (error) {
      await interaction.reply({
        content: `${error.message}`,
        ephemeral: true,
      });
    }
  },
};
