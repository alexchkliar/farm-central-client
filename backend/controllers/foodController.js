const Food = require('../models/food')

exports.food_list = function (req, res, next) {
  Food.find()
    .sort([['species', 'ascending']])
    .exec(function (err, list_foods) {
      if (err) { return next(err); }
      // Successful, so render.
      res.json({food_list: list_foods});
    })
};
