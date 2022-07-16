const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema(
  {
    __foodID: {
      type: Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    __vendorID: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    __buyerID: {
      type: Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },
    addons: [
      {
        name: String,
        price: Number,
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "PLACED",
        "ACCEPTED",
        "COOKING",
        "READY FOR PICKUP",
        "COMPLETED",
        "REJECTED",
      ],
      required: true,
    },
    cost: {
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
  },
  { timestamps: true }
);

module.exports = Orders = mongoose.model("Orders", OrderSchema);
