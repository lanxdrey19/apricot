const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

const findUserCards = async function (userIdentifier) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    return user.cards;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

const findCardsByName = async function (userIdentifier, nameKeyWord) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    const result = user.cards.filter((card) =>
      card.name.toLowerCase().includes(nameKeyWord.toLowerCase())
    );
    return result;
  } catch (err) {
    throw new Error(
      "cards with that certain key term in their name can not be retrieved"
    );
  }
};

const findCardsByGroup = async function (userIdentifier, groupKeyWord) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    const result = user.cards.filter((card) =>
      card.group.toLowerCase().includes(groupKeyWord.toLowerCase())
    );
    return result;
  } catch (err) {
    throw new Error(
      "cards with that certain key term in their name can not be retrieved"
    );
  }
};

const findCardsByEra = async function (userIdentifier, eraKeyWord) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    const result = user.cards.filter((card) =>
      card.era.toLowerCase().includes(eraKeyWord.toLowerCase())
    );
    return result;
  } catch (err) {
    throw new Error(
      "cards with that certain key term in their era can not be retrieved"
    );
  }
};

const findCardsByTag = async function (userIdentifier, tagName) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    const result = user.cards.filter(
      (card) => card.tagName.toLowerCase() === tagName.toLowerCase()
    );
    return result;
  } catch (err) {
    throw new Error("cards with that tag cannot be retrieved");
  }
};

const findCardsBySerial = async function (
  userIdentifier,
  upperBound,
  lowerBound
) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    const result = user.cards.filter(
      (card) =>
        Number(card.recordedSerial) >= Number(lowerBound) &&
        Number(card.recordedSerial) <= Number(upperBound)
    );
    return result;
  } catch (err) {
    throw new Error(
      "cards with the serial bounds specified cannot be retrieved"
    );
  }
};

const findCardsByStars = async function (
  userIdentifier,
  upperBound,
  lowerBound
) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    const result = user.cards.filter(
      (card) =>
        Number(card.stars) >= Number(lowerBound) &&
        Number(card.stars) <= Number(upperBound)
    );
    return result;
  } catch (err) {
    throw new Error(
      "cards with the serial bounds specified cannot be retrieved"
    );
  }
};

const addCardToUser = async function (userIdentifier, cardObject) {
  const updatedUser = await User.updateOne(
    { userId: userIdentifier },
    { $push: { cards: cardObject } }
  );
  return updatedUser;
};

const addClaimedCardToUser = async function (
  templateIdentifier,
  userIdentifier,
  finalStars
) {
  const template = await Template.findById(templateIdentifier);
  let card = {
    name: template.name,
    group: template.group,
    era: template.era,
    photo: template.photo,
    logo: template.logo,
    recordedSerial: template.serial,
    stars: finalStars,
    tagName: "",
  };
  const updatedUser = await User.updateOne(
    { userId: userIdentifier },
    { $push: { cards: card } }
  );

  return card;
};

const deleteCardFromUser = async function (userIdentifier, cardObject) {
  const updatedUser = await User.updateOne(
    { userId: userIdentifier },
    { $pull: { cards: cardObject } }
  );

  return updatedUser;
};

const deleteBurntCardFromUser = async function (
  userIdentifier,
  cardObject,
  finalTokens
) {
  let updatedUser = {
    message: "Success. Maximum number of tokens reached.",
  };

  const user = await User.findOne({
    userId: userIdentifier,
  });

  if (Number(finalTokens) + Number(user.tokens) > 100000) {
    await User.updateOne(
      { userId: userIdentifier },
      { $set: { tokens: 100000 }, $pull: { cards: cardObject } }
    );
  } else {
    updatedUser = await User.updateOne(
      { userId: userIdentifier },
      { $inc: { tokens: finalTokens }, $pull: { cards: cardObject } }
    );
  }
  return updatedUser;
};

const updateCardStars = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });

    if (Number(requestBody.stars === 5)) {
      throw new Error("Card cannot be upgraded any further");
    }

    const result = user.cards.filter(
      (card) =>
        card.name.toLowerCase() === requestBody.name.toLowerCase() &&
        card.group.toLowerCase() === requestBody.group.toLowerCase() &&
        card.era.toLowerCase() === requestBody.era.toLowerCase() &&
        card.photo.toLowerCase() === requestBody.photo.toLowerCase() &&
        card.logo.toLowerCase() === requestBody.logo.toLowerCase() &&
        card.recordedSerial.toLowerCase() ===
          requestBody.recordedSerial.toLowerCase() &&
        card.stars === Number(requestBody.stars) &&
        card.tagName === requestBody.tagName.toLowerCase()
    );

    const updatedUser = await User.updateOne(
      {
        userId: requestBody.userId,
        cards: {
          $elemMatch: result[0],
        },
      },
      {
        $inc: {
          "cards.$.stars": 1,
        },
      }
    );
    return updatedUser;
  } catch (err) {
    throw new Error("Card's stars could not be incremented");
  }
};

module.exports = {
  findUserCards,
  findCardsByName,
  findCardsByGroup,
  findCardsByEra,
  findCardsByTag,
  findCardsBySerial,
  findCardsByStars,
  addCardToUser,
  addClaimedCardToUser,
  deleteCardFromUser,
  deleteBurntCardFromUser,
  updateCardStars,
};
