const mongoose = require('mongoose');
// const { DateTime } = require("luxon");  //for date handling

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  units: { type: String, required: true, maxLength: 100 },
  category: { type: String, maxLength: 100 },
  location: { type: String, maxLength: 100 },
  quantity: { type: Number, min: 0, max: 999 },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, min: 0, required: true },
  photo: { type: String },
  rating: { type: Number, min: 0, max: 5 }
});

// Virtual for this food instance URL.
FoodSchema.virtual('url').get(function() {
  return '/catalog/food/' + this._id;
});

// FoodSchema.virtual('birthDate_yyyy_mm_dd').get(function() {
//   return DateTime.fromJSDate(this.birthDate).toISODate(); //format 'YYYY-MM-DD'
// });

// Export model.
module.exports = mongoose.model('Food', FoodSchema);
