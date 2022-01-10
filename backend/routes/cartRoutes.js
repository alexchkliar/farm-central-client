const router = require("express").Router();
const passport = require("passport");
const CartProduct = require('../models/cart')

const REDIRECT_URL = "http://localhost:3000/pets";

router.post("/add", (req, res) => {
    const newCartProduct = new CartProduct({
      pet: req.body.pet,
      shopper: req.body.shopper,
    });
    newCartProduct.save();
    res.send("Product added to cart");
});

module.exports = router
