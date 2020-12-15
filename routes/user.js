const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/get-user/:userId", userController.getUser);

router.put("/change-bookmark/", userController.changeBookmark);

module.exports = router;
