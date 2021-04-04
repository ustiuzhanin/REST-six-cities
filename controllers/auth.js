const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
};

exports.login = (req, res, next) => {
  const loginEmail = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: loginEmail })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found");
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }

      const { _id, email, bookmarks } = loadedUser;

      const token = jwt.sign(
        {
          email: email,
          userId: _id.toString(),
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        userId: _id.toString(),
        email,
        bookmarks,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.autoAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    res.status(205).json({ message: "token not valid" });
  }

  User.findById(decodedToken.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("A user could not be found");
        error.statusCode = 404;
        throw error;
      }

      const { _id, email, bookmarks } = user;

      res.status(200).json({
        token: token,
        userId: _id.toString(),
        email,
        bookmarks,
      });
    })
    .catch((err) => console.log(err));

  req.userId = decodedToken.userId;
};
