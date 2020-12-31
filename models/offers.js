const mongoose = require("mongoose");
// mongoose.set("debug", true);

const Schema = mongoose.Schema;

const offersSchema = new Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    preview_image: {
      type: String,
      required: true,
    },
    images: [String],
    title: { type: String, required: true },
    is_favorite: { type: Boolean, required: true },
    is_premium: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    type: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    max_adults: { type: Number, required: true },
    price: { type: String, required: true },
    goods: [String],
    description: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      zoom: { type: Number, required: true },
    },
  },
  { collection: "offers" }
);

module.exports = mongoose.model("Offers", offersSchema);
