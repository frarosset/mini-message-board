const { addMessage } = require("../messagesDb.js");
const textModeration = require("../utils/textModeration.js");
const { matchedData } = require("express-validator");
const asyncHandler = require("express-async-handler");
const newValidation = require("../controllers/newValidator.js");

const getNewController = (req, res) => res.render("new");

const postNewController = [
  newValidation,
  asyncHandler(async (req, res, next) => {
    const { text, user } = matchedData(req); // req.body

    try {
      // apply moderation
      const moderationOutput = await textModeration(`${user}: ${text}`);
      // console.log(moderationOutput);

      // filter out harmful content
      if (moderationOutput.isHarmful) {
        res.status(400).render("new", {
          harmfulCategories: moderationOutput.harmfulCategories,
          text,
          user,
        });
        return;
      }

      // add message to board
      addMessage(text, user || process.env.USER_DEFAULT_NAME);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }),
];

module.exports = { get: getNewController, post: postNewController };
