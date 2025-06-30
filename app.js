const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 80;

const indexRouter = require("./routes/indexRouter.js");
const newRouter = require("./routes/newRouter.js");

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public", { extensions: ["html"] }));

app.use(express.urlencoded({ extended: true })); // to parse form data into req.body

app.use("/new", newRouter);
app.use(indexRouter);

app.listen(PORT, () => console.log("Server listening on port", PORT));
