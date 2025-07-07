const express = require("express");
require("dotenv").config();
const initWebSocket = require("./websockets/wss.js");

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

// Ignore favicon icon / ... request
app.get(
  ["/favicon.ico", "/.well-known/appspecific/com.chrome.devtools.json"],
  (req, res) => {
    // console.log(`Ignoring request of ${req.path}`);
    res.sendStatus(204); // No Content
  }
);

// catch-all route throwing a 404 error
app.use((req, res, next) => {
  throw new CustomNotFoundError("Page not found");
});

// Error handling
app.use((error, req, res, next) => {
  console.log(error);

  const code = error.statusCode || 500;
  const message = code !== 500 ? error.message : "Internal server error";

  res.status(code).render("error", { code, message });
});

const server = app.listen(PORT, () =>
  console.log("Server listening on port", PORT)
);

initWebSocket(server);
