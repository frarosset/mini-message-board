const getDateStr = require("../utils/dateToStr.js");
const { getMessage } = require("../db/queries.js");
const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getMessageController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const message = await getMessage(id);

  if (!message) {
    throw new CustomNotFoundError("The message does not exist");
  }

  res.render("messageDetails", { message, dateToStr: getDateStr });
});

module.exports = { get: getMessageController };
