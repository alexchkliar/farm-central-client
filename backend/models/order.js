const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  items: [{ type: [Schema.Types.Mixed] }],
  buyer: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CartProduct', OrderSchema);
