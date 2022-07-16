var express = require("express");
var router = express.Router();

// Load User model
const buyer = require("../models/Buyers");

// GET request
// Getting all the buyers
router.get("/b", function (req, res) {
  buyer.find(function (err, buyer) {
    if (err) {
      console.log(err);
    } else {
      res.json(buyer);
    }
  });
});

const Vendor = require("../models/Vendor");
router.get("/v", function (req, res) {
  Vendor.find(function (err, vendor) {
    if (err) {
      console.log(err);
    } else {
      res.json(vendor);
    }
  });
});

const Wallets = require("../models/Wallet");
router.get("/w", function (req, res) {
  Wallets.find(function (err, wallet) {
    if (err) {
      console.log(err);
    } else {
      res.json(wallet);
    }
  });
});

const Food = require("../models/Food");
router.get("/f", function (req, res) {
  Food.find(function (err, wallet) {
    if (err) {
      console.log(err);
    } else {
      res.json(wallet);
    }
  });
});

const Orders = require("../models/Orders");
router.get("/o", function (req, res) {
  Orders.find(function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.json(order);
    }
  });
});


module.exports = router;
