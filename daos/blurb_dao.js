const User = require("../entities/User");

const setBlurb = async function (requestBody) {
  try {
    await User.updateOne(
      { userId: requestBody.userId },
      { $set: { blurb: requestBody.description } }
    );
  } catch (err) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  setBlurb,
};
