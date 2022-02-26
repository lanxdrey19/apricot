const executeDropCards = async function (dropController) {
  return await dropController.dropCards();
};

module.exports = {
  executeDropCards,
};
