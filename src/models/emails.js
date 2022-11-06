const mongoose = require("mongoose");

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
    type: String,
    required: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
