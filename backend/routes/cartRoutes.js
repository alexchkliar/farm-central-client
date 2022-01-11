const router = require("express").Router();
const passport = require("passport");
const CartProduct = require('../models/cart')
cart_controller = require("../controllers/cartController");

const REDIRECT_URL = "http://localhost:3000/pets";

router.post("/add", (req, res) => {
    const newCartProduct = new CartProduct({
      pet: req.body.pet,
      shopper: req.body.shopper,
    });
    newCartProduct.save();
    res.send("Product added to cart");
});

router.delete("/remove", (req, res) => {
    console.log(req.body.pet._id)
    console.log(req.body.shopper)
    CartProduct.findOneAndDelete( {pet: req.body.pet._id, shopper: req.body.shopper._id}, (err) => {
      if (err) { console.log(err) }
    });
    res.send("Product removed from cart")
});

router.get("/fetch", cart_controller.cart_list)
router.get("/", cart_controller.cart_list)

module.exports = router
