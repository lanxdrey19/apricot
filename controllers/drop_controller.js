const dropDAO = require("../daos/drop_dao");

const dropCards = async function () {
  return await dropDAO.getTemplates();
};

module.exports = {
  dropCards,
};
