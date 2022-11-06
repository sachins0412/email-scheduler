const cron = require("node-cron");

const Email = require("./../models/emails");

const { sendEmail } = require("./sendEmail");
//queries db every minute to retrieve & send email on scheduled time
const startCronJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("running a task every minute");

      const email = await Email.find({});

      if (email.length) {
        try {
          //will have to iterate over the array
          await sendEmail(email[1].data);
          email[1].status = "sent";
          await email[1].save();
        } catch (error) {
          console.log(error);
          email[1].status = "failed";
          await email[1].save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = startCronJob;
