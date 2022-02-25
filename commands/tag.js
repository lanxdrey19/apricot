const { SlashCommandBuilder } = require("@discordjs/builders");
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
          content: `You have not registered in the game\nTo register you must use the command **/user start**.\nOr you have already have a tag with this tag name`,
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "update") {
      const tagEmote = interaction.options.getString("tag-emote");
      try {
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
          content: `You have not registered in the game\nTo register you must use the command **/user start**.\nOr dont currently have the tag you want to update`,
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "delete") {
      try {
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
          content: `You have not registered in the game\nTo register you must use the command **/user start**.\nOr dont currently have the tag you want to delete`,
          ephemeral: true,
        });
      }
    }
  },
};
