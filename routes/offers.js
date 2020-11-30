const express = require("express");

const offersController = require("../controllers/offers");

const router = express.Router();

router.use("/", offersController.getOffers);

module.exports = router;
