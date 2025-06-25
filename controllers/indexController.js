const getDateStr = require("../utils/dateToStr.js");
const { getMessages } = require("../messagesDb.js");

const getIndexController = (req, res) =>
  res.render("index", { messages: getMessages(), dateToStr: getDateStr });

module.exports = { get: getIndexController };
