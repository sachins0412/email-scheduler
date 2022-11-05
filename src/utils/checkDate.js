const moment = require("moment");

const checkDate = (date) => {
  return moment(date, "MM-DD-YYYY HH:mm", true).isValid();
};

module.exports = checkDate;
