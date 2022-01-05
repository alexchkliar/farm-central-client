const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const localStrategy = require("passport-local").Strategy;
const User = require("./models/user")
const bcrypt = require("bcryptjs");

const passport = require("passport")
require('dotenv').config()

// const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user)
          }
          else {
            return done(null, false)
          }
        })
        // if (!user.verifyPassword(password)) { return done(null, false); }
        // return done(null, user);
      });
    }
  ));

  // creates a cookie
  passport.serializeUser((user, cb) => {
    done(null, user.id);
  });

  // returns user from cookie
  passport.deserializeUser((id, cb) => {
    User.findOne({_id: id}, (err, user) =>{
      cb(err, user)
    })
    // done(null, user);
  });

}
