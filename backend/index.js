require('dotenv').config()
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const authRoute = require("./routes/auth");
const bodyParser = require('body-parser')
const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pomqy.mongodb.net/pet_central?retryWrites=true`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use(cookieParser("secretcode"))


app.listen("5000", () => {
  console.log("Server is running!");
});
