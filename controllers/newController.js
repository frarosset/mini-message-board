const { addMessage } = require("../messagesDb.js");

const getNewController = (req, res) => res.render("form");

const postNewController = (req, res) => {
  const { text, user } = req.body;

  addMessage(text, user);
  res.redirect("/");
};

module.exports = { get: getNewController, post: postNewController };
