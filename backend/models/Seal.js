// models/Seal.js
const mongoose = require('mongoose');

const sealSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slot: { type: String, default: 'Seal' },

  visibleStats: { type: Number, default: 0 },

  restrictions: {
    movementTypes: [String],
    weaponTypes: [String]
  },

  iconUrl: String
});

module.exports = mongoose.model('Seal', sealSchema);
