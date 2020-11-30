const Offers = require("../models/offers");

exports.getOffers = (req, res, next) => {
  Offers.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500);
    });
};
