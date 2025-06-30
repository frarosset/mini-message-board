const { getMessage } = require("../messagesDb");

const getMessageController = (req, res) => {
  const id = req.params.id;
  const msg = getMessage(id);

  res.send(JSON.stringify(msg));
};

module.exports = { get: getMessageController };
