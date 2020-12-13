const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({ email: email, password: hashedPw, name: name });
      return user.save();
    })
    .then((result) =>
      res.status(201).json({ message: "user created", userId: result._id })
    )
    .catch((err) => console.log(err));
  res.status(200);
};
