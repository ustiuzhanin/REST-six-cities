const Comments = require("../models/comment");
const { validationResult } = require("express-validator");

exports.createComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const userId = req.userId;
  const rating = req.body.rating;
  const comment = req.body.comment;

  const createComment = new Comments({
    user: userId,
    rating: rating,
    comment: comment,
  });

  return createComment
    .save()
    .then((result) => res.status(200).json(createComment))
    .catch((err) => console.log(err));
};
