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
        console.log(profile)

        User.findOne({ google_sub_id: profile.id }, async (err, obj) => {
          if (err) throw err;
          if (!obj) {
            const newUser = new User({
              name: profile.displayName,
              username: profile.id,
              password: "google_account",
              google_sub_id: profile.id,
            });
            await newUser.save()
          }
        });

        done(null, profile);
      }
    )
  );

  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: process.env.FACEBOOK_APP_ID,
  //       clientSecret: process.env.FACEBOOK_APP_SECRET,
  //       callbackURL: "/auth/facebook/callback",
  //     },
  //     function (accessToken, refreshToken, profile, done) {
  //       done(null, profile);
  //     }
  //   )
  // );

  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  // creates a cookie
  // passport.serializeUser((user, cb) => {
  //   cb(null, user.id);
  // });

  // passport.deserializeUser((id, cb) => {
  //   User.findOne({ _id: id }, (err, user) => {
  //     const userInformation = {
  //       username: user.username,
  //     };
  //     cb(err, userInformation);
  //   });
  // });

  passport.serializeUser((user, done) => {
    const testUser = User.findOne({ google_sub_id: user.id }, (err, googleUser) => {
      const serializedUser = googleUser ? googleUser : user
      // console.log("serializing")
      // console.log(serializedUser)
      done(null, serializedUser);
    });
  });

  passport.deserializeUser((user, done) => {
    // console.log("deserializing")
    // console.log(user)
    done(null, user);
  });
}
