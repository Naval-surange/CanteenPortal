var express = require("express");
var router = express.Router();

// Load User model
const Buyers = require("../models/Buyers");
const Wallets = require("../models/Wallet");

// GET request
// Getting all the users
router.post("/", function (req, res) {
  buyer_id = req.body.buyer_id;
  Wallets.findOne({ __buyerID: buyer_id })
    .then((wallet) => {
      res.status(200).json(wallet);
      return res;
    })
    .catch((err) => {
      res.status(400).send(err);
      return res;
    });
});

router.post("/add", function (req, res) {
  buyer_id = req.body.buyer_id;
  Wallets.findOne({ __buyerID: buyer_id })
    .then((wallet) => {
      wallet.balance = wallet.balance + +req.body.amount;
      wallet.save();
      res.status(200).json(wallet);
      return res;
    })
    .catch((err) => {
      res.status(400).send(err);
      return res;
    });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
// router.post("/register", (req, res) => {
//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         date: req.body.date
//     });
//     newUser.save()
//         .then(user => {
//             res.status(200).json(user);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });

// // POST request
// // Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

module.exports = router;
