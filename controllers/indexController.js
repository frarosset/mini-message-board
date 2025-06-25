const { getMessages } = require("../messagesDb.js");

const getIndexController = (req, res) =>
  res.render("index", { messages: getMessages() });

module.exports = { get: getIndexController };
