const blurbDAO = require("../daos/blurb_dao");

const updateBlurb = async function (requestBody) {
  blurbDAO.setBlurb(requestBody);
};

module.exports = {
  updateBlurb,
};
