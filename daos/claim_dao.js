const Template = require("../entities/Template");
const User = require("../entities/User");

const getWinner = async function (contestants, dropUser, didDropUserClaim) {
  try {
    if (didDropUserClaim) {
      return dropUser;
    } else {
      winner = contestants[Math.floor(Math.random() * contestants.length)];
      return winner;
    }
  } catch (err) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  getWinner,
};
