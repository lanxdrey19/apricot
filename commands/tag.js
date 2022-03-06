const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const permissionInteractor = require("../use_cases/permission_interactor");
const permissionController = require("../controllers/permission_controller");
const tagInteractor = require("../use_cases/tag_interactor");
const tagController = require("../controllers/tag_controller");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tag")
    .setDescription("add, delete, or update your tags")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("add")
        .setDescription("add a tag")
        .addStringOption((option) =>
          option
            .setName("tag-name")
            .setDescription("the name of the tag you want to create")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("tag-emote")
            .setDescription("the emote associated with this tag")
            .setRequired(true)
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("update")
        .setDescription("update one of your tags")
        .addStringOption((option) =>
          option
            .setName("tag-name")
            .setDescription("the name of the tag you want to update")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("tag-emote")
            .setDescription("the new emote you want to use for this tag")
            .setRequired(true)
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("delete")
        .setDescription("delete a tag")
        .addStringOption((option) =>
          option
            .setName("tag-name")
            .setDescription("the name of the tag you want to delete")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const tagName = interaction.options.getString("tag-name");

    if (interaction.options.getSubcommand() === "add") {
      const tagEmote = interaction.options.getString("tag-emote");
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
          tagName: tagName,
          tagEmote: tagEmote,
        };
        await tagInteractor.executeAddTag(tagController, requestBody);
        await interaction.reply(
          `The tag was created successfully:\n${tagName.toLowerCase()} ${tagEmote.toLowerCase()}`
        );
      } catch (error) {
        await interaction.reply({
          content: `${error.message}`,
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "update") {
      const tagEmote = interaction.options.getString("tag-emote");
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
          tagName: tagName,
          tagEmote: tagEmote,
        };
        await tagInteractor.executeUpdateUserTag(tagController, requestBody);
        await interaction.reply(
          `The tag was updated successfully:\n${tagName.toLowerCase()} ${tagEmote.toLowerCase()}`
        );
      } catch (error) {
        await interaction.reply({
          content: `${error.message}`,
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "delete") {
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
          tagName: tagName,
        };
        await tagInteractor.executeDeleteTag(tagController, requestBody);
        await interaction.reply(
          `The tag was deleted successfully:\n${tagName.toLowerCase()}`
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
