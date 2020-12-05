const Offers = require("../models/offers");
const User = require("../models/user");

exports.getOffers = (req, res, next) => {
  Offers.find()
    .populate("host")
    .then((result) => {
      console.log(result[0]);
      res.status(200).json(result);
    })
    .catch((err) => res.status(500));
};

exports.getOffer = (req, res, next) => {
  const offerId = req.params.offerId;

  Offers.findById(offerId)
    .populate("host")
    .populate("city")
    .then((offer) => {
      if (!offer) {
        const error = new Error("Could not find offer");
        error.statusCode = 404;
        throw error;
      }
      console.log(offer);
      res.status(200).json(offer);
    })
    .catch((err) => res.status(500));
};

exports.getOffersByCity = (req, res, net) => {
  const cityName = req.params.cityName;
  const cityNameCapitalized = cityName[0].toUpperCase() + cityName.slice(1);

  Offers.find({ "city.name": cityNameCapitalized }).exec((err, result) => {
    if (err) {
      throw new Error(err);
    }
    console.log(result);
    res.status(200).json(result);
  });
};

exports.getCities = (req, res, next) => {
  Offers.find({}, "city.name")
    .then((offer) => {
      const cities = [];

      offer.map(({ city }) => {
        cities.indexOf(city.name) === -1 ? cities.push(city.name) : null;
      });
      res.status(200).json(cities);
    })
    .catch((err) => res.status(500));
};
