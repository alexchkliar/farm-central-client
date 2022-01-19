require('dotenv').config()
const router = require("express").Router();
const Favorite = require('../models/favorite')
favorite_controller = require("../controllers/favoriteController");

const REDIRECT_URL = `${process.env.URL_BASE_CLIENT}/foods`;

router.post("/add", (req, res) => {
  const newFavorite = new Favorite({
    food: req.body.food,
    shopper: req.body.shopper,
  });
  newFavorite.save();
  res.send("Product added to favorites");
});

router.delete("/remove", (req, res) => {
  // console.log(req.body.food._id)
  // console.log(req.body.shopper)
  Favorite.findOneAndDelete({food: req.body.food, shopper: req.body.shopper}, (err) => {
    if (err) { console.log(err) }
  });
  res.send("Product removed from favorites")
});

router.post("/check", (req, res) => {
  const foundFavorite = Favorite.findOne({food: req.body.food, shopper: req.body.shopper}, (err, obj) => {
    if (err) { console.log(err) }
    res.send(obj !== null)
  });
});

router.get("/fetch", favorite_controller.favorite_list)


module.exports = router;
