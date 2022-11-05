const express = require("express");
const router = express.Router();
const { SENDER } = require("./../enums/email-constants");
const Email = require("./../models/emails");

router.post("/emails", async (req, res) => {
  try {
    const params = req.body;

    const data = {
      to: params.to,
      from: SENDER,
      subject: params.subject,
      text: params.text,
    };

    const email = new Email();
    email.data = data;
    email.scheduled = params.when;
    await email.save();

    res.status(201).send(email);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.message);
  }
});

module.exports = router;
