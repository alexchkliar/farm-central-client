const Pet = require('../models/pet')

exports.pet_list = function (req, res, next) {
  Pet.find()
    .sort([['species', 'ascending']])
    .exec(function (err, list_pets) {
      if (err) { return next(err); }
      // Successful, so render.
      res.json({pet_list: list_pets});
    })
};
