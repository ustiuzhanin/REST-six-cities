const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
  { collection: "comment" }
);

module.exports = mongoose.model("Comment", commentSchema);
