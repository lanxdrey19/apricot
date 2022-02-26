const claimDAO = require("../daos/claim_dao");

const findWinner = async function (contestants, dropUser, didDropUserClaim) {
  if (contestants.length === 0) {
    console.log("returning null");
    return null;
  } else {
    return await claimDAO.getWinner(contestants, dropUser, didDropUserClaim);
  }
};

module.exports = {
  findWinner,
};
