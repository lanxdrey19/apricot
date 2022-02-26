const User = require("../entities/User");

const getDrop = async function (userIdentifier) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    let secondsBetweenTwoDates = Math.abs(
      (Number(Date.now()) - Number(Date.parse(user.lastDropped))) / 1000
    );

    if (secondsBetweenTwoDates > 1800) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("server error occurred");
  }
};

const getClaim = async function (userIdentifier) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    let secondsBetweenTwoDates = Math.abs(
      (Number(Date.now()) - Number(Date.parse(user.lastClaimed))) / 1000
    );

    if (secondsBetweenTwoDates > 600) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("server error occurred");
  }
};

const putLastDropped = async function (userIdentifier) {
  try {
    const updatedUser = await User.updateOne(
      { userId: userIdentifier },
      { $set: { lastDropped: Date.now() } }
    );
    return updatedUser;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

const putLastClaimed = async function (userIdentifier) {
  try {
    const updatedUser = await User.updateOne(
      { userId: userIdentifier },
      { $set: { lastClaimed: Date.now() } }
    );
    return updatedUser;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  getDrop,
  getClaim,
  putLastDropped,
  putLastClaimed,
};
