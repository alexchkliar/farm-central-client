const mongoose = require('mongoose');
// const { DateTime } = require("luxon");  //for date handling

const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  species: { type: String, required: true, maxLength: 100 },
  breed: { type: String, maxLength: 100 },
  quantity: { type: Number, min: 0, max: 99 },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  photo: { type: String }
});

// Virtual for this pet instance URL.
PetSchema.virtual('url').get(function() {
  return '/catalog/pet/' + this._id;
});

// PetSchema.virtual('birthDate_yyyy_mm_dd').get(function() {
//   return DateTime.fromJSDate(this.birthDate).toISODate(); //format 'YYYY-MM-DD'
// });

// Export model.
module.exports = mongoose.model('Pet', PetSchema);
