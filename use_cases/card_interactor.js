const executeGetUserCards = async function (cardController, userId) {
  return await cardController.getUserCards(userId);
};

const executeGetCardsByName = async function (
  cardController,
  userId,
  nameKeyWord
) {
  return await cardController.getCardsByName(userId, nameKeyWord);
};

const executeGetCardsByGroup = async function (
  cardController,
  userId,
  groupKeyWord
) {
  return await cardController.getCardsByGroup(userId, groupKeyWord);
};

const executeGetCardsByEra = async function (
  cardController,
  userId,
  eraKeyWord
) {
  return await cardController.getCardsByEra(userId, eraKeyWord);
};

const executeGetCardsByTag = async function (cardController, userId, tagName) {
  return await cardController.getCardsByTag(userId, tagName);
};

const executeGetCardsBySerial = async function (
  cardController,
  userId,
  upperBound,
  lowerBound
) {
  return await cardController.getCardsBySerial(userId, upperBound, lowerBound);
};

const executeGetCardsByStars = async function (
  cardController,
  userId,
  upperBound,
  lowerBound
) {
  return await cardController.getCardsByStars(userId, upperBound, lowerBound);
};

const executeAddCardToUser = async function (cardController, requestBody) {
  return await cardController.addCardToUser(requestBody);
};

const executeClaimCard = async function (
  cardController,
  templateId,
  requestBody
) {
  return await cardController.claimCard(templateId, requestBody);
};

const executeDeleteCardFromUser = async function (cardController, requestBody) {
  return await cardController.deleteCardFromUser(requestBody);
};

const executeBurnCard = async function (
  cardController,
  templateId,
  requestBody
) {
  return await cardController.burnCard(templateId, requestBody);
};

const executeUpgradeCard = async function (cardController, requestBody) {
  return await cardController.upgradeCard(requestBody);
};

module.exports = {
  executeGetUserCards,
  executeGetCardsByName,
  executeGetCardsByGroup,
  executeGetCardsByEra,
  executeGetCardsByTag,
  executeGetCardsBySerial,
  executeGetCardsByStars,
  executeAddCardToUser,
  executeClaimCard,
  executeDeleteCardFromUser,
  executeBurnCard,
  executeUpgradeCard,
};
