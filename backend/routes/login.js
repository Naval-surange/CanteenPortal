var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

// Load User model
const buyers = require("../models/Buyers");
const vendor = require("../models/Vendor");
const { json } = require("body-parser");

// router.post("/", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   // Find user by email
//   buyers.findOne({ email: email }).then((user) => {
//     // Check if user email exists
//     if (!user) {
//       return res.status(404).json({
//         error: "Email not found",
//       });
//     } else {
//       if (await bcrypt.compare(req.body.password, user.password)) {
//         console.log(req.body.password)
//         console.log(user.password)
//         console.log("here")
//         d = { token: user._id, userType: "buyer" };
//         return res.status(200).json(d);
//       } else {
//         return res.status(400).json({ error: "Failed" });
//       }
//     }
//   });
// });

router.post("/", async (req, res) => {
  let vendorFor = req.body.vendorFor;
  let email = req.body.email;
  let password = req.body.password;

  if (vendorFor === "buyer") {
    buyers.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(200).json({
          error: "Email not found",
        });
      } else {
        if (password === user.password) {
          d = { token: user._id, userType: "buyer" };
          return res.status(201).json(d);
        } else {
          return res.status(202).json({ error: "Failed" });
        }
      }
    });
  } else if (vendorFor === "vendor") {
    vendor.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(200).json({
          error: "Email not found",
        });
      } else {
        if (password === user.password) {
          d = { token: user._id, userType: "vendor" };
          return res.status(201).json(d);
        } else {
          return res.status(202).json({ error: "Failed" });
        }
      }
    });
  }
});

module.exports = router;
