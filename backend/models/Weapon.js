// models/Weapon.js
const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  might: { type: Number, required: true },
  description: String,

  weaponType: { type: String }, // e.g. 'Sword', 'Tome', 'Axe', 'Staff'
  exclusive: Boolean,
  exclusiveTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
  isInheritable: { type: Boolean, default: true },

  restrictions: {
    movementTypes: [String],
    weaponTypes: [String]
  },

  refine: {
    canRefine: { type: Boolean, default: false },
    description: String
  },

  iconUrl: String // for unique refines
});

module.exports = mongoose.model('Weapon', weaponSchema);