const getDateStr = require("../utils/dateToStr.js");
const { getMessages } = require("../messagesDb.js");
const asyncHandler = require("express-async-handler");

const getIndexController = asyncHandler(async (req, res) => {
  const messages = await getMessages();

  res.render("index", { messages, dateToStr: getDateStr });
});

module.exports = { get: getIndexController };
