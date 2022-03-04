const User = require("../entities/User");

const postUser = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });

    if (user) {
      console.log("yes");
      throw new Error("the user already exists");
    }

    const newUser = new User({
      userId: requestBody.userId,
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    throw new Error("the user could not be created");
  }
};

module.exports = {
  postUser,
};
