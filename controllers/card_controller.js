const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");
const cardDAO = require("../daos/card_dao");

const getUserCards = async function (userId) {
  return await cardDAO.findUserCards(userId);
};

const getCardsByName = async function (userId, nameKeyWord) {
  return await cardDAO.findCardsByName(userId, nameKeyWord);
};

const getCardsByGroup = async function (userId, groupKeyWord) {
  return await cardDAO.findCardsByGroup(userId, groupKeyWord);
};

const getCardsByEra = async function (userId, eraKeyWord) {
  return await cardDAO.findCardsByEra(userId, eraKeyWord);
};

const getCardsByTag = async function (userId, tagName) {
  if (tagName === undefined) {
    throw new Error("the tag name is undefined");
  }
  return await cardDAO.findCardsByTag(userId, tagName);
};

const getCardsBySerial = async function (userId, upperBound, lowerBound) {
  return await cardDAO.findCardsBySerial(userId, upperBound, lowerBound);
};

const getCardsByStars = async function (userId, upperBound, lowerBound) {
  return await cardDAO.findCardsByStars(userId, upperBound, lowerBound);
};

const addCardToUser = async function (requestBody) {
  let card = {
    name: requestBody.name,
    group: requestBody.group,
    era: requestBody.era,
    photo: requestBody.photo,
    logo: requestBody.logo,
    recordedSerial: requestBody.recordedSerial,
    stars: Number(requestBody.stars),
    tagName: "",
  };
  let userIdentifier = requestBody.userId;
  return await cardDAO.addCardToUser(userIdentifier, card);
};

const claimCard = async function (templateIdentifier, requestBody) {
  let userIdentifier = requestBody.userId;

  let finalStars;
  let starNumber = Math.floor(Math.random() * 100) + 1;
  if (starNumber > 99) {
    finalStars = 5;
  } else if (starNumber > 90) {
    finalStars = 4;
  } else if (starNumber > 75) {
    finalStars = 3;
  } else if (starNumber > 55) {
    finalStars = 2;
  } else if (starNumber > 30) {
    finalStars = 1;
  } else {
    finalStars = 0;
  }
  return await cardDAO.addClaimedCardToUser(
    templateIdentifier,
    userIdentifier,
    finalStars
  );
};

const deleteCardFromUser = async function (requestBody) {
  let card = {
    name: requestBody.name,
    group: requestBody.group,
    era: requestBody.era,
    photo: requestBody.photo,
    logo: requestBody.logo,
    recordedSerial: requestBody.recordedSerial,
    stars: Number(requestBody.stars),
    tagName: requestBody.tagName,
  };
  let userIdentifier = requestBody.userId;
  return await cardDAO.deleteCardFromUser(userIdentifier, card);
};

const burnCard = async function (templateIdentifier, requestBody) {
  let card = {
    templateId: templateIdentifier,
    recordedSerial: requestBody.recordedSerial,
    stars: Number(requestBody.stars),
    tagName: requestBody.tagName,
  };

  let userIdentifier = requestBody.userId;

  let finalTokens;

  if (Number(requestBody.stars) === 5) {
    finalTokens = Math.floor(Math.random() * 1) + 100;
  } else if (Number(requestBody.stars) === 4) {
    finalTokens = Math.floor(Math.random() * 9) + 91;
  } else if (Number(requestBody.stars) === 3) {
    finalTokens = Math.floor(Math.random() * 15) + 76;
  } else if (Number(requestBody.stars) === 2) {
    finalTokens = Math.floor(Math.random() * 20) + 56;
  } else if (Number(requestBody.stars) === 1) {
    finalTokens = Math.floor(Math.random() * 25) + 31;
  } else {
    finalTokens = Math.floor(Math.random() * 30) + 1;
  }

  return await cardDAO.deleteBurntCardFromUser(
    userIdentifier,
    card,
    finalTokens
  );
};

const upgradeCard = async function (requestBody) {
  return await cardDAO.updateCardStars(requestBody);
};

module.exports = {
  getUserCards,
  getCardsByName,
  getCardsByGroup,
  getCardsByEra,
  getCardsByTag,
  getCardsBySerial,
  getCardsByStars,
  addCardToUser,
  claimCard,
  deleteCardFromUser,
  burnCard,
  upgradeCard,
};
