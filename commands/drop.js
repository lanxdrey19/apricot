const {
  SlashCommandBuilder,
  userMention,
  memberNicknameMention,
  channelMention,
  roleMention,
} = require("@discordjs/builders");
const dropInteractor = require("../use_cases/drop_interactor");
const dropController = require("../controllers/drop_controller");

const timerInteractor = require("../use_cases/timer_interactor");
const timerController = require("../controllers/timer_controller");
const cardInteractor = require("../use_cases/card_interactor");
const cardController = require("../controllers/card_controller");

const permissionInteractor = require("../use_cases/permission_interactor");
const permissionController = require("../controllers/permission_controller");
const claimInteractor = require("../use_cases/claim_interactor");
const claimController = require("../controllers/claim_controller");

const templateInteractor = require("../use_cases/template_interactor");
const templateController = require("../controllers/template_controller");

let card_1_contestants = [];
let card_2_contestants = [];
let card_3_contestants = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("drop")
    .setDescription("Spawn three cards and collect one if you wish!"),
  async execute(interaction) {
    try {
      const permissionStatus =
        await permissionInteractor.executeCheckPermissions(
          permissionController,
          interaction.guild.id.toString(),
          interaction.user.id,
          null,
          [1, 1, 1, 0]
        );

      if (!permissionStatus.validity) {
        await interaction.reply({
          content: permissionStatus.message,
          ephemeral: true,
        });
      } else if (
        permissionStatus.dropChannel.toString() !==
        interaction.channelId.toString()
      ) {
        await interaction.reply({
          content: `You must drop at ${interaction.guild.channels.cache.get(
            permissionStatus.dropChannel
          )}`,
          ephemeral: true,
        });
      } else {
        let dropValidityStatus = await timerInteractor.executeValidateDrop(
          timerController,
          interaction.user.id
        );

        if (!dropValidityStatus) {
          await interaction.reply({
            content: `You have to wait 30 minutes until your next drop`,
            ephemeral: true,
          });
        } else {
          const drops = await dropInteractor.executeDropCards(dropController);
          await timerInteractor.executeUpdateLastDropped(
            timerController,
            interaction.user.id
          );
          let message = await interaction.reply({
            content: drops.toString(),
            fetchReply: true,
          });

          try {
            await message.react("1️⃣");
            await message.react("2️⃣");
            await message.react("3️⃣");
          } catch (error) {
            console.error("One of the emojis failed to react:", error);
          }

          const filter = (reaction, user) => {
            return (
              ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) && !user.bot
            );
          };

          const collector = message.createReactionCollector({
            filter,
            time: 15000,
          });

          collector.on("collect", async (reaction, user) => {
            const result = await timerInteractor.executeValidateClaim(
              timerController,
              user.id.toString()
            );
            if (result) {
              if (reaction.emoji.name === "1️⃣") {
                card_1_contestants.push(user.id.toString());
              } else if (reaction.emoji.name === "2️⃣") {
                card_2_contestants.push(user.id.toString());
              } else if (reaction.emoji.name === "3️⃣") {
                card_3_contestants.push(user.id.toString());
              }
            }
          });

          collector.on("end", async (collected) => {
            let finalWinnerOne = await claimInteractor.executeFindWinner(
              claimController,
              card_1_contestants,
              interaction.user.id,
              card_1_contestants.includes(interaction.user.id.toString())
            );

            if (finalWinnerOne === null) {
              finalWinnerOne = "";
            }
            let new_card_2_contestants = card_2_contestants.filter(
              (contestant) =>
                contestant.toString() !== finalWinnerOne.toString()
            );
            let finalWinnerTwo = await claimInteractor.executeFindWinner(
              claimController,
              new_card_2_contestants,
              interaction.user.id,
              new_card_2_contestants.includes(interaction.user.id.toString())
            );
            if (finalWinnerTwo === null) {
              finalWinnerTwo = "";
            }
            let new_card_3_contestants = card_3_contestants.filter(
              (contestant) =>
                !(
                  contestant.toString() === finalWinnerOne.toString() ||
                  contestant.toString() === finalWinnerTwo.toString()
                )
            );
            let finalWinnerThree = await claimInteractor.executeFindWinner(
              claimController,
              new_card_3_contestants,
              interaction.user.id,
              new_card_3_contestants.includes(interaction.user.id.toString())
            );

            if (finalWinnerOne) {
              await timerController.updateLastClaimed(finalWinnerOne);
              const card = await cardInteractor.executeClaimCard(
                cardController,
                drops[0]._id,
                {
                  userId: finalWinnerOne,
                }
              );

              const templateIdentifiers = {
                name: drops[0].name,
                group: drops[0].group,
                era: drops[0].era,
              };
              await templateInteractor.executeIncrementSerial(
                templateController,
                templateIdentifiers
              );
              await interaction.followUp(
                `${userMention(finalWinnerOne)} won the #${
                  card.recordedSerial
                } ${card.era} ${card.group} ${card.name} card. It has ${
                  card.stars
                } stars`
              );
            }

            if (finalWinnerTwo) {
              await timerController.updateLastClaimed(finalWinnerTwo);
              const card = await cardInteractor.executeClaimCard(
                cardController,
                drops[1]._id,
                {
                  userId: finalWinnerTwo,
                }
              );
              const templateIdentifiers = {
                name: drops[1].name,
                group: drops[1].group,
                era: drops[1].era,
              };
              await templateInteractor.executeIncrementSerial(
                templateController,
                templateIdentifiers
              );
              await interaction.followUp(
                `${userMention(finalWinnerTwo)} won the #${
                  card.recordedSerial
                } ${card.era} ${card.group} ${card.name} card. It has ${
                  card.stars
                } stars`
              );
            }
            if (finalWinnerThree) {
              await timerController.updateLastClaimed(finalWinnerThree);
              const card = await cardInteractor.executeClaimCard(
                cardController,
                drops[2]._id,
                {
                  userId: finalWinnerThree,
                }
              );
              const templateIdentifiers = {
                name: drops[2].name,
                group: drops[2].group,
                era: drops[2].era,
              };
              await templateInteractor.executeIncrementSerial(
                templateController,
                templateIdentifiers
              );
              await interaction.followUp(
                `${userMention(finalWinnerThree)} won the #${
                  card.recordedSerial
                } ${card.era} ${card.group} ${card.name} card. It has ${
                  card.stars
                } stars`
              );
            }
            await interaction.deleteReply();
          });
        }
      }
    } catch (error) {
      await interaction.reply({
        content: `This user has not registered in the game\nTo register they must use the command **/user start**.\ndrop channel not registered\ndid not drop at the right channel`,
        ephemeral: true,
      });
    }
  },
};
