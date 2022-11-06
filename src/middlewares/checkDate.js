const moment = require("moment-timezone");

const checkDateMiddleware = (req, res, next) => {
  if (req.body.when && !checkDate(req.body.when)) {
    return res.status(400).send("Invalid date");
  }
  next();
};

const checkDate = (date) => {
  return (
    moment(date, "MM-DD-YYYY HH:mm", true).isValid() &&
    moment(date).isAfter(moment().tz("Asia/Kolkata"))
  );
};

module.exports = checkDateMiddleware;
