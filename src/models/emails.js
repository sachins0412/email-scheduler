const mongoose = require("mongoose");
const checkDate = require("./../utils/checkDate");

const emailSchema = mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "not sent",
  },
  scheduled: {
    type: Date,
    required: true,
    validate(value) {
      if (!checkDate(value)) throw new Error("invaid date");
    },
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
