const User = require('../models/user')

exports.selected_user = function (req, res, next) {
  console.log(req.params)
  User.findOne({_id: req.params.id })
    // .sort([['species', 'ascending']])
    .exec(function (err, user) {
      if (err) { return next(err); }
      // Successful, so render.
      // console.log(list_foods)
      res.json({user});
    })
};
