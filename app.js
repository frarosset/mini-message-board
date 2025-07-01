const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 80;

const indexRouter = require("./routes/indexRouter.js");
const newRouter = require("./routes/newRouter.js");
const messageRouter = require("./routes/messageRouter.js");
const CustomNotFoundError = require("./errors/CustomNotFoundError");

const app = express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public", { extensions: ["html"] }));

app.use(express.urlencoded({ extended: true })); // to parse form data into req.body

app.use("/new", newRouter);
app.use("/message", messageRouter);
app.use(indexRouter);

// catch-all route throwing a 404 error
app.use((req, res, next) => {
  throw new CustomNotFoundError("Page not found");
});

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.statusCode || 500).send(error.message);
});

app.listen(PORT, () => console.log("Server listening on port", PORT));
