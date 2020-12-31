const express = require("express");

const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");
const commentController = require("../controllers/comment");

const router = express.Router();

// TODO add comment validation
router.post("/comment", isAuth, commentController.createComment);

router.get("/comment/:offerId", commentController.getComments);

module.exports = router;
