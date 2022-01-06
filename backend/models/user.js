const mongoose = require('mongoose')

const user = new mongoose.Schema({
  username: { type: String, maxLength: 100, required: true },
  // email: { type: String, maxLength: 100 },
  password: { type: String, maxLength: 100, required: true },
  google_sub_id: String
}, { strict: false })

module.exports = mongoose.model("User", user)
