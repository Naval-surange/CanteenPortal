const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const path = require("path");

// routes
var buyerRouter = require("./routes/buyer");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var vendorRouter = require("./routes/vendor");
var walletRouter = require("./routes/wallet");
var infoRouter = require("./routes/info");
var orderRouter = require("./routes/order");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
// const connection = mongoose.connection;
// connection.once('open', function() {
//     console.log("MongoDB database connection established successfully !");
// })

DB =
  "mongodb+srv://iiith-canteen:1234@cluster0.dyaui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connection established successfully !");
  })
  .catch((err) => {
    console.log("MongoDB database connection error !", err);
  });

// setup API endpoints
app.use("/api/buyer", buyerRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/info", infoRouter);
app.use("/api/order", orderRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "./frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
  });
}


app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
