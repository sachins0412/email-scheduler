const moment = require("moment");

const checkDateMiddleware = (req, res, next) => {
  if (req.body.when && !checkDate(req.body.when)) {
    return res.status(400).send("Invalid date");
  }
  next();
};

const checkDate = (date) => {
  console.log("input date", moment(date));
  console.log("input date in utc", moment(date).subtract(360, "minutes"));

  console.log("current", moment());
  console.log("current in utc", moment().utc());

  console.log("compare", moment(date).isAfter(moment()));
  return (
    moment(date, "MM-DD-YYYY HH:mm", true).isValid() &&
    moment(date).isAfter(moment())
  );
};

module.exports = checkDateMiddleware;
