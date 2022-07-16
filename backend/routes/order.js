var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var sentgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sentgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

// Load User model
const Buyers = require("../models/Buyers");
const Vendors = require("../models/Vendor");
const Orders = require("../models/Orders");
const Wallets = require("../models/Wallet");
const Foods = require("../models/Food");

router.post("/get_all_food", async (req, res) => {
  const vendor_id = req.body.vendor_id;

  Orders.find({ __vendorID: vendor_id }, (err, orders) => {
    if (err) {
      console.log(err);
    } else {
      let order_ids = [];
      for (let x in orders) {
        order_ids.push(orders[x]._id);
      }

      Foods.find({ __orderID: { $in: order_ids } }, (err, foods) => {
        if (err) {
          console.log(err);
        } else {
          res.json(foods);
        }
      });
    }
  });
});

router.post("/get", async (req, res) => {
  const vendor_id = req.body.vendor_id;

  Orders.find({ __vendorID: vendor_id }, (err, orders) => {
    if (err) {
      console.log(err);
    } else {
      res.json(orders);
    }
  });
});

router.post("/my_orders", async (req, res) => {
  const user_id = req.body.user_id;

  Orders.find({ __buyerID: user_id }, (err, orders) => {
    if (err) {
      console.log(err);
    } else {
      res.json(orders);
    }
  });
});

//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

router.post("/update", async (req, res) => {
  try {
    const order_id = req.body.order_id;

    Orders.findById(order_id).then((order) => {
      if (order.status === "PLACED") {
        order.status = "ACCEPTED";
      } else if (order.status === "ACCEPTED") {
        order.status = "COOKING";
      } else if (order.status === "COOKING") {
        order.status = "READY FOR PICKUP";
      } else if (order.status === "READY FOR PICKUP") {
        order.status = "COMPLETED";
      }

      order.save().then((order) => {
        Buyers.findById(order.__buyerID).then((buyer) => {
          Foods.findById(order.__foodID).then((food) => {
            Vendors.findById(order.__vendorID).then((vendor) => {
              if (order.status === "ACCEPTED") {
                vendor.currentOrders = vendor.currentOrders + 1;
                vendor.save();
              }

              if (order.status === "READY FOR PICKUP") {
                vendor.currentOrders = vendor.currentOrders - 1;
                vendor.save();
              }

              try {
                const mailOptions = {
                  from: "navalsurange2@gmail.com",
                  to: buyer.email,
                  subject: "Order Status",
                  html: `
                <h1>Your order status has been updated </h1>
                <h2>Order name: ${food.name}</h2>
                <h2>Shop name: ${vendor.shopName}</h2>
                <h2>Current Status: ${order.status}</h2>
                <h3>Vendors contact : ${vendor.contact}</h3>
                `,
                };

                transporter.sendMail(mailOptions);
              } catch (error) {
                console.log(error);
              }
            });
          });
        });

        res.json(order);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  Buyers.findById(req.body.buyer_id).then((buyer) => {
    Foods.findById(req.body.food_id).then((food) => {
      Vendors.findById(food.__vendorID).then((vendor) => {
        Wallets.findOne({ __buyerID: buyer._id }).then((wallet) => {
          if (wallet.balance < food.price * req.body.quantity) {
            res.status(400).json({
              error: "Insufficient balance",
            });
          } else {
            wallet.balance = wallet.balance - food.price * req.body.quantity;
            wallet.save();

            vendor.balance = vendor.balance + food.price * req.body.quantity;
            vendor.save();

            const newOrder = new Orders({
              __buyerID: buyer._id,
              __foodID: food._id,
              __vendorID: vendor._id,
              quantity: req.body.quantity,
              cost: food.price * req.body.quantity,
              status: "PLACED",
            });

            newOrder.save().then((order) => {
              const mailOptions = {
                from: "navalsurange2@gmail.com",
                to: buyer.email,
                subject: "Order Placed",
                html: `
                <h1>Your order has been placed </h1>
                <h2>Order name: ${food.name}</h2>
                <h2>Shop name: ${vendor.shopName}</h2>
                <h2>Current Status: ${order.status}</h2>
                <h3>Vendors contact : ${vendor.contact}</h3>
                `,
              };

              transporter.sendMail(mailOptions);

              res.status(200).json(order);
            });
          }
        });
      });
    });
  });
});

module.exports = router;
