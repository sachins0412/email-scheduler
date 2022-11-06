const express = require("express");
const router = express.Router();
const { SENDER } = require("./../enums/email-constants");
const Email = require("./../models/emails");
const checkDateMiddleware = require("./../middlewares/checkDate");
const validator = require("./../middlewares/validator");

router.post("/emails", checkDateMiddleware, async (req, res) => {
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

router.get("/emails/:id", validator, async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);

    if (!email) {
      return res.status(404).send("No email scheduled for given id");
    }

    res.send(email);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.get("/emails", async (req, res) => {
  try {
    const emails = await Email.find({});

    res.send(emails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.patch("/email/:id", async (req, res) => {
  //WIP
});

router.delete("/email/:id", async (req, res) => {
  //WIP
});

router.get("/email/unsent", async (req, res) => {
  //WIP
});

module.exports = router;
