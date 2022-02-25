const User = require("../entities/User");

const setBlurb = async function (userIdentifier, description) {
  try {
    console.log("hey");
    const result = await User.updateOne(
      { userId: userIdentifier },
      { $set: { blurb: description } }
    );
    console.log(result);
    console.log("yea");
  } catch (err) {
    throw new Error("the blurb could not be set");
  }
};

module.exports = {
  setBlurb,
};
