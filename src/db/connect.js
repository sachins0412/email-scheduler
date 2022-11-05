const mongoose = require("mongoose");

const MONGO_URI = "mongodb://127.0.0.1:27017/email-scheduler";

const connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("connection to db successful"))
    .catch((e) => console.log("error while connecting to db ", e));
};

module.exports = connect;
