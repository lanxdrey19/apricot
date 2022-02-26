const executeValidateDrop = async function (timerController, userId) {
  return await timerController.validateDrop(userId);
};

const executeValidateClaim = async function (timerController, userId) {
  return await timerController.validateClaim(userId);
};

const executeUpdateLastDropped = async function (timerController, userId) {
  return await timerController.updateLastDropped(userId);
};

const executeUpdateLastClaimed = async function (timerController, userId) {
  return await timerController.updateLastClaimed(userId);
};

module.exports = {
  executeValidateDrop,
  executeValidateClaim,
  executeUpdateLastDropped,
  executeUpdateLastClaimed,
};
