const { Router } = require("express");
const newController = require("../controllers/newController.js");

const newRouter = Router();
newRouter.route("/").get(newController.get).post(newController.post);

module.exports = newRouter;
