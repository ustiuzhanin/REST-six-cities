const express = require("express");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");
const commentController = require("../controllers/comment");

const router = express.Router();

router.post("/comment", isAuth, commentController.createComment);

module.exports = router;