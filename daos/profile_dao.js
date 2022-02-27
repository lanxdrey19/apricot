const User = require("../entities/User");

const findUserProfile = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });
    if (user) {
      return {
        blurb: user.blurb,
        tags: user.tags,
        ultimate: user.ultimate,
        tokens: user.tokens,
      };
    } else {
      throw new Error("the user could not be found");
    }
  } catch (error) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  findUserProfile,
};
