const Template = require("../entities/Template");

const getTemplates = async function () {
  try {
    const templates = await Template.find();
    let finalList = [];
    while (finalList.length < 3) {
      const template = templates[Math.floor(Math.random() * templates.length)];

      if (!finalList.includes(template)) {
        finalList.push(template);
      }
    }
    return finalList;
  } catch (err) {
    throw new Error("server error occurred");
  }
};

module.exports = {
  getTemplates,
};
