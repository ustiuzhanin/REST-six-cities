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
    .then((city) => {
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
    })
    .then((offer) =>
      User.findById(req.userId)
        .then((user) => {
          user.offers.push(offer._id);

          return user.save();
        })
        .then(() => res.status(200).json({ message: "offer created!" }))
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
};

exports.deleteOffer = (req, res, next) => {
  const offerId = req.params.offerId;

  Offers.findById(offerId)
    .then((offer) => {
      if (!offer) {
        const error = new Error("Could not find offer");
        error.statusCode = 404;
        throw error;
      }

      if (offer.host.toString() !== req.userId) {
        console.log(offer.host.toString() + " offer");
        console.log(req.userId + " user");
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }

      return Offers.findByIdAndRemove(offerId);
    })
    .then(() => {
      return User.findById(req.userId);
    })
    .then((user) => {
      console.log(user.offers);
      const filteredOffers = user.offers.filter(
        (offer) => offer.toString() !== offerId
      );

      user.offers = filteredOffers;
      return user.save();
    })
    .then(() => res.status(200).json({ message: "offer has been deleted!" }))
    .catch((err) => console.log(err));
};

exports.getOffersByCity = (req, res, next) => {
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
