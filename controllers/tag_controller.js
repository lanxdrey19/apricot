const User = require("../entities/User");
const tagDAO = require("../daos/tag_dao");

const getTags = async function (userId) {
  return await tagDAO.findTags(userId);
};

const addTag = async function (requestBody) {
  await tagDAO.addTagForUser(requestBody);
};

const deleteTag = async function (requestBody) {
  await tagDAO.deleteTagForUser(requestBody);
};

const updateUserTag = async function (requestBody) {
  await tagDAO.updateTagForUser(requestBody);
};

const tagUserCard = async function (requestBody) {
  return await tagDAO.updateTagUserCard(requestBody);
};

module.exports = {
  getTags,
  addTag,
  deleteTag,
  updateUserTag,
  tagUserCard,
};
