const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const placeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
