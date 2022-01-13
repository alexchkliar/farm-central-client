const Order = require('../models/order')

exports.sale_list = function (req, res, next) {
  Order.find()
    // .sort([['species', 'ascending']])
    .exec(function (err, list_sales) {
      if (err) { return next(err); }
      // Successful, so render.
      res.json({sale_list: list_sales});
    })
};
