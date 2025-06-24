const { Router } = require("express");
const newController = require("../controllers/newController.js");

const newRouter = Router();
newRouter.get("/", newController.get);

module.exports = newRouter;
