const e = require("express");
const cron = require("node-cron");

const Email = require("./../models/emails");

//queries db every second to send email on scheduled time
const startCronJob = () => {
  cron.schedule("* * * * * *", async () => {
    console.log("running a task every second");

    const email = await Email.find({});

    if (email.length) {
      console.log(email);
    }
  });
};

module.exports = startCronJob;
