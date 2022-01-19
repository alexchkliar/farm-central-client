const router = require("express").Router();
const passport = require("passport");
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const REDIRECT_URL = `${process.env.URL_BASE_CLIENT}/foods`;

router.get("/login/success", (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //   cookies: req.cookies
    });
  } else {
    res.send("could not fetch user")
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
  res.redirect(REDIRECT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: REDIRECT_URL,
    failureRedirect: "/login/failed",
  })
);

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: REDIRECT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(`${user}: No User Exists`);
    else {
      req.login(user, (err) => {
        if (err) throw err;
        // res.status(200);
        res.send("Successfully Authenticated");
        // console.log(req.user);
        // res.redirect(REDIRECT_URL);
      });
    }
  })(req, res, next);
});

router.post("/user", (req, res) => {
  // console.log(req.body)
  res.send(req.user)
});

router.get("/usersList", (req, res) => {
  User.find({}, function(err, users) {
    // var userMap = {};
    // users.forEach(function(user) {
    //   userMap[user._id] = user;
    // });
    res.send(users);
  });
});

router.get("/specificUser", (req, res) => {
  User.findOne({ google_sub_id: req.user.id }, function(err, user) {
    res.send(user);
  });
});

module.exports = router
