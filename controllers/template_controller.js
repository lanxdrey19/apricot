const Template = require("../entities/Template");
const templateDAO = require("../daos/template_dao");

const createTemplate = async function (requestBody) {
  const template = new Template({
    name: requestBody.name,
    group: requestBody.group,
    era: requestBody.era,
    logo: requestBody.logo,
    photo: requestBody.photo,
  });

  return await templateDAO.postTemplate(template);
};

const updateSerial = async function (requestBody) {
  templateIdentifiers = {
    name: requestBody.name,
    group: requestBody.group,
    era: requestBody.era,
  };
  return await templateDAO.putSerial(templateIdentifiers);
};

module.exports = {
  createTemplate,
  updateSerial,
};
