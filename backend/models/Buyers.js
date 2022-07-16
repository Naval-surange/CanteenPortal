const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
	  unique : true,
	  dropDups: true,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    batchName: {
      type: String,
      enum: ["UG1","UG2","UG3","UG4","UG5","UG6"],
      required: true,
    },
    favs:{
      type: [Schema.Types.ObjectId],
    },
    password : {
      type: String,
      required: true,
    },
    __walletID: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: false,
    },
  },
  { timestamps: true }
);

// BuyerSchema.plugin(uniqueValidator);
module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
