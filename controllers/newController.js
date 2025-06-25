const getNewController = (req, res) => res.render("form");

const postNewController = (req, res) => res.send("posted (todo)");

module.exports = { get: getNewController, post: postNewController };
