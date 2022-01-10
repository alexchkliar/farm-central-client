const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartProductSchema = new Schema({
  pet: { type: Schema.Types.ObjectId, ref: 'Pet' },
  shopper: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('CartProduct', CartProductSchema);
