var express = require("express");
var router = express.Router();

// Load User model
const buyer = require("../models/Buyers");
const foods = require("../models/Food");
// GET request
// Getting all the buyers
router.get("/", function (req, res) {
  buyer.find(function (err, buyer) {
    if (err) {
      console.log(err);
    } else {
      res.json(buyer);
    }
  });
});

router.post("/unfav", function (req, res) {
  buyer.findById(req.body.buyer_id, function (err, buyer) {
    if (err) {
      console.log(err);
    } else {
      buyer.favs.pull(req.body.food_id);
      buyer.save(function (err, buyer) {
        if (err) {
          console.log(err);
        } else {
          res.json(buyer);
        }
      });
    }
  });
});

router.post("/getfavs", async function (req, res) {
  buyer.findById(req.body.buyer_id, async function (err, buyer) {
    if (err) {
      res.status(404).json({ err: "Buyer not fund" });
    } else {
      let favs = [];
      for (let x in buyer.favs) {
        favs.push(buyer.favs[x]);
      }

      foods.find({ _id: { $in: favs } }, function (err, foods) {
        if (err) {
          console.log(err);
        } else {
          res.json(foods);
        }
      });
    }
  });
});

router.post("/make_fav", function (req, res) {
  buyer.findByIdAndUpdate(
    req.body.user_id,
    { $push: { favs: req.body.food_id } },
    function (err, buyer) {
      if (err) {
        console.log(err);
      } else {
        res.json(buyer);
      }
    }
  );
});
router.post("/get_buyer", function (req, res) {
  let buyer_id = req.body.buyer_id;
  buyer.findById(buyer_id, function (err, buyer) {
    if (err) {
      res.status(404).json({ err: "buyer not found" });
    } else {
      res.json(buyer);
    }
  });
});

router.post("/update", (req, res) => {
  let user_id = req.body.user_id;
  let target = req.body.target;
  let new_data = req.body.new_data;

  buyer.findById(user_id, function (err, buyer) {
    buyer[target] = new_data;
    buyer.save(function (err, buyer) {
      if (err) {
        console.log(err);
      } else {
        res.json(buyer);
      }
    });
  });
});

module.exports = router;
