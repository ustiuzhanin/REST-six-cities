const express = require("express");
const fs = require("fs");

const offersController = require("../controllers/offers");

const router = express.Router();

router.use("/", offersController.getOffers);

module.exports = router;
