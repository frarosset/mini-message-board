const { Router } = require("express");
const newController = require("../controllers/newController.js");
const newValidation = require("../controllers/newValidator.js");

const newRouter = Router();
newRouter
  .route("/")
  .get(newController.get)
  .post(newValidation.post, newController.post);

module.exports = newRouter;
