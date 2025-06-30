const getDateStr = require("../utils/dateToStr.js");
const { getMessage } = require("../messagesDb");

const getMessageController = (req, res) => {
  const id = req.params.id;
  const message = getMessage(id);

  res.render("messageDetails", { message, dateToStr: getDateStr });
};

module.exports = { get: getMessageController };
