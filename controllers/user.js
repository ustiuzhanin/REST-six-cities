const User = require("../models/user");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log(err));
};
