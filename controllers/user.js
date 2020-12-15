const User = require("../models/user");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log(err));
};

exports.updateUser = (req, res, next) => {
  const userId = req.query.userId;
  const offerId = req.query.offerId;

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
