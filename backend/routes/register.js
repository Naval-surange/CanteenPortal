var express = require("express");
var router = express.Router();

var fs = require('fs');

// Load User model
const buyer = require("../models/Buyers");
const vendor = require("../models/Vendor");
const wallet = require("../models/Wallet");

router.get("/", function (req, res) {
  vendor.find(function (err, buyer) {
    if (err) {
      console.log(err);
    } else {
      res.json(buyer);
    }
  });
});

router.post("/", async (req, res) => {
  if (req.body.for === "buyer") {
    const newBuyer = new buyer({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      age: req.body.age,
      batchName: req.body.batchName,
      password: req.body.password,
    });
    const newWallet = new wallet({
      __buyerID: newBuyer._id,
      balance: 0,
    });
    newBuyer.__walletID = newWallet._id;

    newWallet.save();

    newBuyer
      .save()
      .then((user) => {
        res.status(200).json(user);
        return res;
      })
      .catch((err) => {
        res.status(400).send(err);
        return res;
      });
  } else if (req.body.for === "vendor") {

    console.log("time",req.body.openTime);

    const newVendor = new vendor({
      managerName: req.body.managerName,
      shopName: req.body.shopName,
      email: req.body.email,
      contact: req.body.contact,
      openTime: req.body.openTime,
      closeTime: req.body.closeTime,
      password: req.body.password,
    });

    newVendor
      .save()
      .then((user) => {
        res.status(200).json(user);
        return res;
      })
      .catch((err) => {
        res.status(400).send(err);
        return res;
      });
  } else {
    res.status(400).send("Invalid Request");
  }
});

module.exports = router;
