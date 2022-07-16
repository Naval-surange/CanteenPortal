const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema(
  {
    managerName: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      unique: true,
      dropDups: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      dropDups: true,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance :{
      type: Number,
      default: 0,
    },
    openTime: {
      type: Date,
      required: true,
    },
    currentOrders :{
      type: Number,
      default:0,
      max:10,
      required:true,
    },
    closeTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// VendorSchema.plugin(uniqueValidator);
module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
