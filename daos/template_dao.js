const Template = require("../entities/Template");

const postTemplate = async function (template) {
  try {
    const savedTemplate = await template.save();
    return savedTemplate;
  } catch (err) {
    throw new Error("the template record could not be created");
  }
};

const putSerial = async function (templateIdentifiers) {
  try {
    const updatedTemplate = await Template.updateOne(templateIdentifiers, {
      $inc: { serial: 1 },
    });
    return updatedTemplate;
  } catch (err) {
    throw new Error("the template's serial number could not be incremented");
  }
};

module.exports = {
  postTemplate,
  putSerial,
};
