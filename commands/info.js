const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Replies with your input!")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("user")
        .setDescription("gets info of member")
        .addUserOption((option) =>
          option.setName("target").setDescription("Select a user")
        )
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("server").setDescription("gets info of member")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "user") {
      const user = interaction.options.getUser("target");

      if (user) {
        await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
      } else {
        await interaction.reply(
          `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
        );
      }
    } else if (interaction.options.getSubcommand() === "server") {
      await interaction.reply(
        `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
      );
    }
  },
};
