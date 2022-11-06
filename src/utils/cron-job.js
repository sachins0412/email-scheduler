const cron = require("node-cron");

const Email = require("./../models/emails");

const { sendEmail } = require("./sendEmail");
//queries db every minute to retrieve & send email on scheduled time
const startCronJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log("running a task every minute");

    const email = await Email.find({});

    if (email.length) {
      //will have to iterate over the array
      sendEmail(email[0].data)
        .then(() => {
          console.log("inside then");
          //db query to do something.... maybe delete the sent mails to clear space ? or update status to "sent" idk
        })
        .catch((e) => {
          console.log("failed", e);
          //db query to do change the status to failed
        });
    }
  });
};

module.exports = startCronJob;
