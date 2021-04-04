const express = require("express");

const isAuth = require("../middleware/is-auth");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/get-user/:userId", userController.getUser);

router.put("/change-bookmark/:offerId", isAuth, userController.changeBookmark);

module.exports = router;
