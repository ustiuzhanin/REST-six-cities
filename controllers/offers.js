const Offers = require("../models/offers");

exports.getOffers = (req, res, next) => {
  console.log("11");
  const offers = Offers.find()
    .then((result) => {
      // console.log(result);
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
