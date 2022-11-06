const cron = require("node-cron");
const moment = require("moment-timezone");

const Email = require("./../models/emails");

const { sendEmail } = require("./sendEmail");
//queries db every minute to retrieve & send email on scheduled time
const startCronJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("running cron job now");
      const emails = await Email.find({
        status: "not sent",
        scheduled: moment().tz("Asia/Kolkata").format("MM-DD-YYYY HH:mm"),
      });
      if (emails.length) {
        emails.forEach(async (email) => {
          try {
            await sendEmail(email.data);
            console.log("email sent");
            email.status = "sent";
            await email.save();
          } catch (error) {
            console.log(error);
            email.status = "failed";
            await email.save();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = startCronJob;
