const validator = (req, res, next) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (req.body.to && !req.body.to.match(emailRegex)) {
    return res.status(400).send("invalid email");
  }

  if (req.params.id) {
    const ObjectId = require("mongoose").Types.ObjectId;
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send("invalid id");
    }
  }

  next();
};

module.exports = validator;
