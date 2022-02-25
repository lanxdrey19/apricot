const User = require("../entities/User");

const postUser = async function (userIdentifier) {
  try {
    const user = new User({
      userId: userIdentifier,
    });
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    throw new Error("the user could not be created");
  }
};

const findUser = async function (userIdentifier) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });
    return user;
  } catch (err) {
    throw new Error("the user could not be retrieved");
  }
};

module.exports = {
  postUser,
  findUser,
};
