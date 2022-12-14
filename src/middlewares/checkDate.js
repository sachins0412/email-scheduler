const moment = require("moment");

const checkDateMiddleware = (req, res, next) => {
  if (req.body.when && !checkDate(req.body.when)) {
    return res.status(400).send("Invalid date");
  }
  req.body.when = moment(req.body.when).subtract(330, "minutes"); // convert date to utc
  next();
};

const checkDate = (date) => {
  return (
    moment(date, "MM-DD-YYYY HH:mm", true).isValid() &&
    moment(date).subtract(330, "minutes").isAfter(moment())
  );
};

module.exports = checkDateMiddleware;
