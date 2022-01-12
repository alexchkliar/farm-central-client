const router = require("express").Router();
const passport = require("passport");
const CartProduct = require('../models/cart')
cart_controller = require("../controllers/cartController");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

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

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Cool item 1"}],
  [2, { priceInCents: 20000, name: "Cool item 2" }],
])

// req.body.itemns = [ { id: 1, quantity: 3 }, { id: 2, quantity: 1 } ]

router.post("/create-checkout-session", async (req, res) => {
  console.log("here2")
  try {
    // console.log(req.body.items[0])
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item[0][2],
            },
            unit_amount: item[0][5] * 100,
          },
          quantity: item[0][0],
        }
      }),
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/cart",
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
