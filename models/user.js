const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    is_pro: { type: Boolean, default: false },
    avatar_url: { type: String, default: "/img/avatar.svg" },
    offers: [{ type: Schema.Types.ObjectId, ref: "Offers" }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Offers" }],
  },
  { collection: "user" }
);

module.exports = mongoose.model("User", userSchema);
