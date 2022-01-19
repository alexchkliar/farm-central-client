const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: 'Food' },
  shopper: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
