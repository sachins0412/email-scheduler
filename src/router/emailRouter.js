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

//get unsent & failed emails
router.get("/emails/unsent", async (req, res) => {
  try {
    const emails = await Email.find({ status: { $ne: "sent" } });

    res.send(emails);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
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

router.patch(
  "/emails/:id",
  checkDateMiddleware,
  validator,
  async (req, res) => {
    try {
      const email = await Email.findById(req.params.id);

      if (!email) {
        return res.status(404).send("No email scheduled for given id");
      }

      if (email.status === "sent") {
        return res.status(403).send("Cannot update already sent emails");
      }

      if (req.body.when) email.scheduled = req.body.when;

      let allowedUpdates = ["to", "from", "subject", "text"];

      allowedUpdates.forEach((update) => {
        if (req.body[update]) email.data[update] = req.body[update];
      });
      email.markModified("data");

      //rescheduling failed email
      if (email.status === "failed") email.status = "not sent";

      await email.save();

      res.send(email);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);

router.delete("/emails/:id", validator, async (req, res) => {
  try {
    const email = await Email.findByIdAndDelete(req.params.id);
    if (!email) {
      return res.status(404).send("No email scheduled for given id");
    }

    res.send(email);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
