const express = require("express");

const isAuth = require("../middleware/is-auth");
const offersController = require("../controllers/offers");

const router = express.Router();

router.get("/offers", offersController.getOffers);

router.get("/offer/:offerId", offersController.getOffer);

router.post("/offer", isAuth, offersController.createOffer);

router.delete("/offer/:offerId", isAuth, offersController.deleteOffer);

router.put("/offer/:offerId", isAuth, offersController.updateOffer);

router.get("/city-offers/:cityName", offersController.getOffersByCity);

router.get("/cities", offersController.getCities);

module.exports = router;
