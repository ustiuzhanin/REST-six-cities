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
  const offerId = req.body.offerId;
  const rating = req.body.rating;
  const comment = req.body.comment;

  Comments.findById(offerId)
    .then((result) => {
      if (!result) {
        result = new Comments({
          _id: offerId,
          comments: [
            {
              user: userId,
              rating: rating,
              comment: comment,
            },
          ],
        });
      } else {
        result.comments.push({
          user: userId,
          rating: rating,
          comment: comment,
        });
      }
      return result.save();
    })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => console.log(err));
};

exports.getComments = (req, res, next) => {
  const offerId = req.params.offerId;

  Comments.findById(offerId).then((result) => {
    console.log(result);
    res.status(200).json(result);
  });
};
