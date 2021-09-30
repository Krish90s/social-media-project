const { User } = require("../models/user");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid reset-token detected");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.resetToken = null;
  await user.save();
  res.send("Password Changed");
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: new PasswordComplexity({
      min: 8,
      max: 26,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
  });
  return schema.validate(req);
}

module.exports = router;
