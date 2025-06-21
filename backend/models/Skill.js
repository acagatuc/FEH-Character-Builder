// models/Skill.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slot: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true
  },

  description: String,
  visibleStats: { type: [Number], default: [0,0,0,0,0] },

  restrictions: {
    movementTypes: [String],
    weaponTypes: [String]
  },

  isInheritable: { type: Boolean, default: true },
  exclusiveTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],

  iconUrl: String
});

module.exports = mongoose.model('Skill', skillSchema);
