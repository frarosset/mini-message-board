const express = require("express");
require("dotenv").config();

const indexRouter = require("./routes/indexRouter.js");
const newRouter = require("./routes/newRouter.js");

const app = express();

const PORT = process.env.PORT || 80;

app.use("/new", newRouter);
app.use(indexRouter);

app.listen(PORT, () => console.log("Server listening on port", PORT));
