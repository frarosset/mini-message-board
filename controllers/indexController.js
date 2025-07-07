const getDateStr = require("../public/js/dateToStr.js").default;
const { getMessages } = require("../db/queries.js");
const asyncHandler = require("express-async-handler");
const ejs = require("ejs");
const path = require("node:path");
const util = require("util");

const getIndexController = asyncHandler(async (req, res) => {
  const messages = await getMessages();

  res.render("index", { messages, dateToStr: getDateStr });
});

const ejsRenderFilePromise = util.promisify(ejs.renderFile);
const getUpdatedDataForMessageList = async () => {
  const messages = await getMessages();

  try {
    const html = await ejsRenderFilePromise(
      path.join(__dirname, "../views/partials/messageList.ejs"),
      {
        messages,
        dateToStr: getDateStr,
      }
    );

    return JSON.stringify({
      messageListHtml: html,
      now: new Date().toISOString(),
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { get: getIndexController, getUpdatedDataForMessageList };
