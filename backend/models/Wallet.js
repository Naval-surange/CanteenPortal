const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WalletSchema = new Schema(
  {
    __buyerID: {
      type: Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = Wallet = mongoose.model("Wallets", WalletSchema);
