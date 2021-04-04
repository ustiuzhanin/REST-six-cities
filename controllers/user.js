const User = require("../models/user");
const Offer = require("../models/offers");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(user);
    })
    .catch((err) => console.log(err));
};

exports.changeBookmark = (req, res, next) => {
  const userId = req.userId;
  const offerId = req.params.offerId;

  Offer.findById(offerId)
    .then((offer) => {
      if (!offer) {
        const error = new Error("Offer not found");
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => console.log(err));

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      if (user.bookmarks.indexOf(offerId) !== -1) {
        user.bookmarks = user.bookmarks.filter(
          (offer) => offer.toString() !== offerId
        );
      } else {
        user.bookmarks.push(offerId);
      }
      return user.save();
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
