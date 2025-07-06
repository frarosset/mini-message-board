const getDateStr = require("../public/js/dateToStr.js").default;
const { getMessages } = require("../db/queries.js");
const asyncHandler = require("express-async-handler");

const getIndexController = asyncHandler(async (req, res) => {
  const messages = await getMessages();

  res.render("index", { messages, dateToStr: getDateStr });
});

module.exports = { get: getIndexController };
