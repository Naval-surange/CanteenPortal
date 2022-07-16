const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      minimum: 0,
      maximim: 5,
      default: 0,
      required: true,
    },
    veg: {
      type: Boolean,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    addons: [
      {
        name: String,
        price: Number,
      },
    ],
    __vendorID: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Food = mongoose.model("Foods", FoodSchema);
