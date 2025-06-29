const { addMessage } = require("../messagesDb.js");
const textModeration = require("../utils/textModeration.js");
const { matchedData } = require("express-validator");

const getNewController = (req, res) => res.render("new");

const postNewController = async (req, res, next) => {
  const { text, user } = matchedData(req); // req.body

  try {
    // apply moderation
    const moderationOutput = await textModeration(`${user}: ${text}`);
    console.log(moderationOutput);

    // filter out harmful content
    if (moderationOutput.isHarmful) {
      res.render("newHarmful", {
        harmfulCategories: moderationOutput.harmfulCategories,
        text,
        user,
      });
      return;
    }

    // add message to board
    addMessage(text, user);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

module.exports = { get: getNewController, post: postNewController };
