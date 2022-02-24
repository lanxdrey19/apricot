const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Replies with your input!")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("The input to echo back")
      .setRequired(true)
  );

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with your input!")
    .addStringOption((option) =>
      option.setName("input").setDescription("The input to echo back")
    )
    .addIntegerOption((option) =>
      option.setName("int").setDescription("Enter an integer")
    )
    .addBooleanOption((option) =>
      option.setName("choice").setDescription("Select a boolean")
    ),

  async execute(interaction) {
    const string = interaction.options.getString("input");
    const integer = interaction.options.getInteger("int");
    const boolean = interaction.options.getBoolean("choice");

    await interaction.reply(string + " " + integer + " " + boolean);
  },
};
