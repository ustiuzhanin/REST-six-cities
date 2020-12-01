const express = require("express");

const offersController = require("../controllers/offers");

const router = express.Router();

router.get("/", offersController.getOffers);

router.get("/:offerId", offersController.getOffer);

module.exports = router;
