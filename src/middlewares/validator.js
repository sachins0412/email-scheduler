const validator = (req, res, next) => {
  const ObjectId = require("mongoose").Types.ObjectId;
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("invalid id");
  }

  next();
};

module.exports = validator;
