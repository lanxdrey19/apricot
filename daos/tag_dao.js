const User = require("../entities/User");

const findTags = async function (userIdentifier) {
  try {
    const user = await User.findOne({
      userId: userIdentifier,
    });

    return user.tags;
  } catch (err) {
    throw new Error("User's tags could not be retrieved");
  }
};

const addTagForUser = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });
    let isValid = true;
    user.tags.forEach((tagInfo) => {
      if (tagInfo.tagName.toLowerCase() === requestBody.tagName.toLowerCase()) {
        isValid = false;
      }
    });
    if (isValid) {
      let tag = {
        tagName: requestBody.tagName.toString().toLowerCase(),
        tagEmote: requestBody.tagEmote.toString().toLowerCase(),
      };
      const updatedUser = await User.updateOne(
        { userId: requestBody.userId },
        { $push: { tags: tag } }
      );
      return updatedUser;
    } else {
      throw new Error("Tag already exists");
    }
  } catch (err) {
    throw new Error("Tag could not be added to user");
  }
};

const deleteTagForUser = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });
    let isValid = false;
    let finalTagName;
    let finalTagEmote;

    user.tags.forEach((tagInfo) => {
      if (tagInfo.tagName.toLowerCase() === requestBody.tagName.toLowerCase()) {
        isValid = true;
        finalTagName = tagInfo.tagName.toLowerCase();
        finalTagEmote = tagInfo.tagEmote.toLowerCase();
      }
    });
    if (isValid) {
      let tag = {
        tagName: finalTagName,
        tagEmote: finalTagEmote,
      };
      const updatedUser = await User.updateOne(
        { userId: requestBody.userId },
        { $pull: { tags: tag } }
      );
      return updatedUser;
    } else {
      throw new Error("Tag could not be found");
    }
  } catch (err) {
    throw new Error("Tag could not be deleted from user");
  }
};

const updateTagForUser = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });
    let isValid = false;
    let finalTagName;
    let finalTagEmote;

    user.tags.forEach((tagInfo) => {
      if (tagInfo.tagName.toLowerCase() === requestBody.tagName.toLowerCase()) {
        isValid = true;
        finalTagName = tagInfo.tagName.toLowerCase();
        finalTagEmote = requestBody.tagEmote.toLowerCase();
      }
    });
    if (isValid) {
      const updatedUser = await User.updateOne(
        { userId: requestBody.userId, "tags.tagName": finalTagName },
        {
          $set: {
            "tags.$.tagEmote": finalTagEmote,
          },
        }
      );
      return updatedUser;
    } else {
      throw new Error("Tag could not be found");
    }
  } catch (err) {
    throw new Error("Tag could not be updated");
  }
};

const updateTagUserCard = async function (requestBody) {
  try {
    const user = await User.findOne({
      userId: requestBody.userId,
    });
    const matchingTag = user.tags.filter(
      (tag) =>
        tag.tagName.toLowerCase() === requestBody.newTagName.toLowerCase()
    );
    if (matchingTag.length !== 1 && requestBody.newTagName !== "") {
      res.status(400).json({ message: "error" });
    }
    const matchingCards = user.cards.filter(
      (card) =>
        card.name.toLowerCase() === requestBody.name.toLowerCase() &&
        card.group.toLowerCase() === requestBody.group.toLowerCase() &&
        card.era.toLowerCase() === requestBody.era.toLowerCase() &&
        card.photo.toLowerCase() === requestBody.photo.toLowerCase() &&
        card.logo.toLowerCase() === requestBody.logo.toLowerCase() &&
        card.recordedSerial.toLowerCase() ===
          requestBody.recordedSerial.toLowerCase() &&
        card.stars === Number(requestBody.stars) &&
        card.tagName.toLowerCase() === requestBody.tagName.toLowerCase()
    );

    const updatedUser = await User.updateOne(
      {
        userId: requestBody.userId,
        cards: {
          $elemMatch: matchingCards[0],
        },
      },
      {
        $set: {
          "cards.$.tagName": requestBody.newTagName.toLowerCase(),
        },
      }
    );
    return updatedUser;
  } catch (err) {
    throw new Error("Card's tag could not be updated");
  }
};

module.exports = {
  findTags,
  addTagForUser,
  deleteTagForUser,
  updateTagForUser,
  updateTagUserCard,
};
