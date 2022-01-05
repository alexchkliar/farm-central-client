const router = require("express").Router();
const passport = require("passport");
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));
// router.get("/hey", (req, res) => {
//   console.log(123)
// });

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
  );

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists")
    else {
      req.logIn(user, err => {
        if (err) throw err;
        res.send("Successfully authenticated")
        console.log(req.user);
      })
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    // console.log(req.body)
    // console.log(doc)
    // console.log(err)
    // console.log(res)
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

router.post("/user", (req, res) => {
  // console.log(req.body)
  res.send(req.user)
});

module.exports = router
