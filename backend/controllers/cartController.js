const Cart = require('../models/cart')

exports.cart_list = function (req, res, next) {
  // console.log(req.body)
  Cart.find()
  // Cart.find({ shopper: user })
    // .sort([['species', 'ascending']])
    .exec(function (err, list_cart) {
      // console.log(req.body)
      if (err) { return next(err); }
      // Successful, so render.
      res.json({cart_list: list_cart});
  })
};
