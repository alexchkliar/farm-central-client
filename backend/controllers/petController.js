var Pet = require('../models/pet')
const { body, validationResult } = require("express-validator");

exports.pet_list = function (req, res, next) {
  Pet.find()
    .sort([['species', 'ascending']])
    .exec(function (err, list_pets) {
      if (err) { return next(err); }
      // Successful, so render.
      res.json({pet_list: list_pets});
    })
};