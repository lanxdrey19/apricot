const User = require("../entities/User");
const timerDAO = require("../daos/timer_dao");

const validateDrop = async function (userId) {
  return await timerDAO.getDrop(userId);
};

const validateClaim = async function (userId) {
  return await timerDAO.getClaim(userId);
};

const updateLastDropped = async function (userId) {
  return await timerDAO.putLastDropped(userId);
};

const updateLastClaimed = async function (userId) {
  return await timerDAO.putLastClaimed(userId);
};

module.exports = {
  validateDrop,
  validateClaim,
  updateLastDropped,
  updateLastClaimed,
};
