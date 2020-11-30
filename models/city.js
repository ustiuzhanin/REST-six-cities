const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  city: {
    name: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      zoom: { type: Number, required: true },
    },
  },
});

module.exports = mongoose.model("City", citySchema);
