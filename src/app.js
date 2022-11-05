const express = require("express");
const app = express();
app.use(express.json());

const emailRouter = require("./router/emailRouter");

app.use("/", emailRouter);

module.exports = app;
