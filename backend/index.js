require('dotenv').config()
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const saleRoutes = require("./routes/saleRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const bodyParser = require('body-parser')
const app = express();


mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pomqy.mongodb.net/food_central?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
  cookieSession({ name: "session", keys: ["temp_key"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(session({
  secret: process.env.COOKIE_PASSWORD,
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(
  cors({
    origin: process.env.URL_BASE_CLIENT,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

app.use(cookieParser(process.env.COOKIE_PASSWORD))
app.use("/auth", authRoutes);
app.use("/foods", foodRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/sold", saleRoutes);
app.use("/user", userRoutes);
app.use("/favorite", favoriteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
}

app.listen("5000", () => {
  console.log("Server is running!");
});
