var express = require("express");
var router = express.Router();

const Vendor = require("../models/Vendor");
const Food = require("../models/Food");
const { response } = require("express");

router.get("/", function (req, res) {
  if (req.body.vendor_id) {
    Vendor.findOne({ vendor_id: req.body.vendor_id }, function (err, vendor) {
      if (err) {
        res.status(400).json({ msg: "Vendor not found" });
      } else {
        response.status(200).json(vendor);
        return res;
      }
    });
  }

  Vendor.find(function (err, vendor) {
    if (err) {
      console.log(err);
    } else {
      res.json(vendor);
    }
  });
});

router.post("/details", (req, res) => {
  Vendor.findById(req.body.vendor_id, function (err, vendor) {
    if (err) {
      res.status(400).json({ msg: "Vendor not found" });
    } else {
      res.status(200).json(vendor);
      return res;
    }
  });
});


router.post("/update", (req, res) => {
  let user_id = req.body.user_id;
  let target = req.body.target;
  let new_data = req.body.new_data;
  Vendor.findById(user_id, function (err, byr) {
    if (err) {
      res.status(400).json({ msg: "Buyer not found!!" });
    } else {
      try {
        byr[target] = new_data;

        byr.validate(function (err) {
          if (err) {
            res.status(400).json({ msg: "Invalid data", err: err });
          } else {
            byr.save(function (err) {
              if (err) {
                res.status(401).json({ msg: "Error in updating", err: err });
              } else {
                res.status(200).json({ msg: "Updated successfully" });
              }
            });
          }
        });
      } catch (error) {
        // console.log(error);
        res.status(400).json({ err: error });
      }
    }
  });
});


router.post("/get_dish", (req, res) => {
  let food_id = req.body.food_id;
  Food.findById(food_id, function (err, food) {
    if (err) {
      res.status(400).json({ msg: "Food not found!!" });
    } else {
      res.json(food);
    }
  });
});

router.post("/update_dish", (req, res) => {
  let food_id = req.body.food_id;
  let target = req.body.target;
  let new_data = req.body.new_data;
  Food.findById(food_id, function (err, food) {
    if (err) {
      res.status(400).json({ msg: "Food not found!!" });
    } else {
      try {
        food[target] = new_data;

        food.validate(function (err) {
          if (err) {
            res.status(400).json({ msg: "Invalid data", err: err });
          } else {
            food.save(function (err) {
              if (err) {
                res.status(400).json({ msg: "Error in updating", err: err });
              } else {
                res.status(200).json({ msg: "Updated successfully" });
              }
            });
          }
        });
      } catch (error) {
        res.status(400).json({ err: error });
      }
    }
  });
});

router.post("/delete_dish", (req, res) => {
  let food_id = req.body.food_id;
  Food.findByIdAndDelete(food_id, function (err, food) {
    if (err) {
      res.status(400).json({ msg: "Food not found!!" });
    } else {
      res.status(200).json({ msg: "Deleted successfully" });
    }
  });
});

router.post("/get_dishes", (req, res) => {
  let vendor_id = req.body.vendor_id;
  Food.find({ __vendorID: vendor_id }).then((food) => {
    if (!food) {
      res.status(400).json({ msg: "Vendor not found!!" });
    } else {
      res.json(food);
    }
  });
});

router.post("/addDish", (req, res) => {
  const newFood = new Food({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    rating: req.body.rating,
    veg: req.body.veg,
    addons: req.body.addons,
    tags: req.body.tags,
    __vendorID: req.body.vendor_id,
  });

  newFood
    .save()
    .then((food) => {
      res.status(201).json(food);
      return res;
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
      return res;
    });
});

module.exports = router;
