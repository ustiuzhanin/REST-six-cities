const express = require("express");

const User = require("../models/user");
const authController = require("../controllers/auth");

const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must contain at least 5 characters"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must contain at least 3 characters"),
  ],
  authController.signup
);

module.exports = router;
