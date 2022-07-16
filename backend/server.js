const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "test1"

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

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/buyer", buyerRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/vendor", vendorRouter);
app.use("/wallet", walletRouter);
app.use("/info", infoRouter);
app.use("/order", orderRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
