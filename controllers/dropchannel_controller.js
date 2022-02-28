const dropChannelDAO = require("../daos/dropchannel_dao");

const updateDropChannel = async function (requestBody) {
  return await dropChannelDAO.putServerDropChannel(requestBody);
};

module.exports = {
  updateDropChannel,
};
