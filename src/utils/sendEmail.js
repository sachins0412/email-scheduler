const sgMail = require("@sendgrid/mail");

const API_KEY = process.env.API_KEY;

sgMail.setApiKey(API_KEY);

const sendEmail = (email) => sgMail.send(email);

module.exports = { sendEmail };
