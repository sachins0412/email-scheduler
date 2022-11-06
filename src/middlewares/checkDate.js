const moment = require("moment-timezone");

const checkDateMiddleware = (req, res, next) => {
  if (req.body.when && !checkDate(req.body.when)) {
    return res.status(400).send("Invalid date");
  }
  next();
};

const checkDate = (date) => {
  console.log("timezone time", moment().tz("Asia/Kolkata"));
  console.log("moment", moment());
  console.log("moment input date", moment(date));
  console.log(
    "moment compate",
    moment(date).isAfter(moment().tz("Asia/Kolkata"))
  );
  return (
    moment(date, "MM-DD-YYYY HH:mm", true).isValid() &&
    moment(date).isAfter(moment().tz("Asia/Kolkata"))
  );
};

module.exports = checkDateMiddleware;
