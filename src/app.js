var moment = require("moment-timezone");
moment.tz.setDefault("Asia/Kolkata", true);

const express = require("express");
const app = express();

app.use(express.json());

const startCronJob = require("./utils/cron-job");

const emailRouter = require("./router/emailRouter");

startCronJob();

app.use("/", emailRouter);

module.exports = app;
