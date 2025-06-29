const { body, matchedData, validationResult } = require("express-validator");

const newPostValidation = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("The message can not be empty.")
    .isLength({
      max: process.env.TEXT_MAX_LENGTH,
    })
    .withMessage(
      `The message can have at most ${process.env.TEXT_MAX_LENGTH}  ${
        process.env.TEXT_MIN_LENGTH == 1 ? "character" : "characters"
      }.`
    )
    .isLength({
      min: process.env.TEXT_MIN_LENGTH,
    })
    .withMessage(
      `The message must have at least ${process.env.TEXT_MIN_LENGTH} ${
        process.env.TEXT_MIN_LENGTH == 1 ? "character" : "characters"
      }.`
    ),
  body("user")
    .trim()
    .optional({ values: "falsy" })
    .isLength({
      max: process.env.USER_MAX_LENGTH,
    })
    .withMessage(
      `Your name can have at most ${process.env.USER_MAX_LENGTH}  ${
        process.env.USER_MAX_LENGTH == 1 ? "character" : "characters"
      }.`
    )
    .isLength({
      min: process.env.USER_MIN_LENGTH,
    })
    .withMessage(
      `Your name must have at least ${process.env.USER_MIN_LENGTH} ${
        process.env.USER_MIN_LENGTH == 1 ? "character" : "characters"
      }.`
    )
    .matches(new RegExp(process.env.USER_ALLOWED_CHARS, "i"))
    .withMessage("Your name has some invalid characters."),
  (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send(JSON.stringify(result.errors));
    }

    // no errors
    next();
  },
];

module.exports = { post: newPostValidation };
