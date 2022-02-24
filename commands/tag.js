const { SlashCommandBuilder } = require("@discordjs/builders");

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
    const tagEmote = interaction.options.getString("tag-emote");
    if (interaction.options.getSubcommand() === "add") {
      await interaction.reply(`Created successfully:\n${tagName} ${tagEmote}`);
    } else if (interaction.options.getSubcommand() === "update") {
      await interaction.reply(`Updated successfully:\n${tagName} ${tagEmote}`);
    } else if (interaction.options.getSubcommand() === "delete") {
      await interaction.reply(`Deleted successfully:\n${tagName} :some_emote:`);
    }
  },
};
