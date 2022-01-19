const Favorite = require('../models/favorite')

exports.favorite_list = function (req, res, next) {
  // console.log(req.body)
  Favorite.find()
    // .sort([['species', 'ascending']])
    .exec(function (err, list_favorite) {
      // console.log(req.body)
      if (err) { return next(err); }
      // Successful, so render.
      res.json({favorite_list: list_favorite});
  })
};
