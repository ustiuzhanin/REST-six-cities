const Offers = require("../models/offers");

exports.getOffers = (req, res, next) => {
  Offers.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => res.status(500));
};

exports.getOffer = (req, res, next) => {
  const offerId = req.params.offerId;
  Offers.findById(offerId)
    .then((offer) => {
      if (!offer) {
        const error = new Error("Could not find offer");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(offer);
    })
    .catch((err) => res.status(500));
};
