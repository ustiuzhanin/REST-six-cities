const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    is_pro: { type: Boolean, required: true },
    avatar_url: { type: String, required: true },
    _id: { type: Schema.Types.ObjectId, required: true },
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
