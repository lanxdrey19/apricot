const executeFindWinner = async function (
  claimController,
  contestants,
  dropUser,
  didDropUserClaim
) {
  return await claimController.findWinner(
    contestants,
    dropUser,
    didDropUserClaim
  );
};

module.exports = {
  executeFindWinner,
};
