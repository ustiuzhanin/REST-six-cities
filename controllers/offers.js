const Offers = require("../models/offers");
const User = require("../models/user");
const City = require("../models/city");

exports.getOffers = (req, res, next) => {
  console.log(req.isAuth);
  Offers.find()
    .populate("host")
    .populate("city")
    .then((result) => {
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
      res.status(200).json(offer);
    })
    .catch((err) => res.status(500));
};

exports.createOffer = (req, res, next) => {
  const {
    title,
    is_favorite,
    is_premium,
    type,
    bedrooms,
    max_adults,
    price,
    description,
    goods,
    images,
    preview_image,
  } = req.body;

  City.findOne({ name: req.body.city_name })
    .then(
      (city) => {
        const newOffer = new Offers({
          city: city._id,
          host: req.userId,
          location: city.location,
          title,
          is_favorite,
          is_premium,
          type,
          bedrooms,
          max_adults,
          price,
          description,
          goods,
          images,
          preview_image,
        });
        return newOffer.save();
      }
      // res.status(200).json()
    )
    .then((offer) =>
      User.findById(req.userId)
        .then((user) => {
          user.offers.push(offer._id);
          console.log(user);
          return user.save();
        })
        .then(() => res.status(200).json({ message: "offer created!" }))
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
};

exports.getOffersByCity = (req, res, net) => {
  const cityName = req.params.cityName;
  const cityNameCapitalized = cityName[0].toUpperCase() + cityName.slice(1);

  Offers.find()
    .populate({
      path: "city",
      match: {
        name: cityNameCapitalized,
      },
    })
    .exec((err, result) => {
      if (err) {
        throw new Error(err);
      }

      res.status(200).json(result.filter((offer) => offer.city));
    });
};

exports.getCities = (req, res, next) => {
  Offers.find({}, "city.name")
    .populate("city")
    .then((offer) => {
      const cities = [];

      offer.map(({ city }) => {
        cities.indexOf(city.name) === -1 ? cities.push(city.name) : null;
      });
      res.status(200).json(cities);
    })
    .catch((err) => res.status(500));
};
