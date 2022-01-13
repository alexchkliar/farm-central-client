const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  items: [Schema.Types.Mixed],
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Order', OrderSchema);
