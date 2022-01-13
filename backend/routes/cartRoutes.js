const router = require("express").Router();
const passport = require("passport");
const CartProduct = require('../models/cart')
const Order = require('../models/order')
const Pet = require('../models/pet')
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

router.post("/create_order", (req, res) => {
  console.log("right here")
  console.log(req.body.items)
  console.log(req.body.buyer)
  const newOrder = new Order({
    items: req.body.items,
    buyer: req.body.buyer,
  });
  newOrder.save();
  res.send("Order registered");
});

router.delete("/remove", (req, res) => {
  // console.log(req.body.pet._id)
  // console.log(req.body.shopper)
  CartProduct.findOneAndDelete( {pet: req.body.pet._id, shopper: req.body.shopper._id}, (err) => {
    if (err) { console.log(err) }
  });
  res.send("Product removed from cart")
});

router.get("/fetch", cart_controller.cart_list)

router.patch("/adjust", (req, res) => {
  console.log("adjusting count")
  console.log(req.body.cartItems)

  req.body.cartItems.forEach(item => {

    Pet.findByIdAndUpdate(item.petObj._id, { quantity: item.petObj.quantity - item.itemCartQuantity }, {}, (err) => {
      if (err) { console.log(err); }
      console.log("Updated cart instance")
    });

  });

  console.log("done adjusting count")
  res.send("Adjusted cart content")
});

router.delete("/wipe", (req, res) => {
  // console.log("howdy")
  // console.log(req.body.shopper)
  CartProduct.deleteMany( { shopper: req.body.shopper._id }, (err) => {
    if (err) { console.log(err) }
  });
  res.send("Wiped cart content")
});

router.post("/create-checkout-session", async (req, res) => {
  // console.log("here2")
  // console.log(req.body.items)
  // console.log(req.body.user)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.petName,
            },
            unit_amount: item.petPrice * 100,
          },
          quantity: item.itemCartQuantity,
        }
      }),
      success_url: "http://localhost:3000/cart_cleanup",
      cancel_url: "http://localhost:3000/cart",
    })

    // if(session.payment_status != null) {
    //   CartProduct.deleteMany( { shopper: req.body.user._id }, (err) => {
    //     if (err) { console.log(err) }
    //   });
    // }

    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }

});

module.exports = router
