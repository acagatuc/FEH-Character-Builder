// models/Special.js
const mongoose = require('mongoose');

const specialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  restrictions: {
    movementTypes: [String],
    weaponTypes: [String]
  },

  isInheritable: { type: Boolean, default: true },
  exclusiveTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
});

module.exports = mongoose.model('Special', specialSchema);
