const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const permissionInteractor = require("../use_cases/permission_interactor");
const permissionController = require("../controllers/permission_controller");
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
        await permissionInteractor.executeCheckPermissions(
          permissionController,
          interaction.guild.id.toString(),
          interaction.user.id,
          interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR),
          [0, 0, 1, 0]
        );

        let requestBody = {
          userId: interaction.user.id.toString(),
          description: description,
        };

        await blurbInteractor.executeUpdateBlurb(blurbController, requestBody);
        await interaction.reply(
          `Blurb update successfully to:\n${description}`
        );
      } catch (error) {
        await interaction.reply({
          content: `${error.message}`,
          ephemeral: true,
        });
      }
    }
  },
};
