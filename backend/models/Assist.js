// models/Assist.js
const mongoose = require('mongoose');

const assistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  restrictions: {
    movementTypes: [String],
    weaponTypes: [String]
  },

  isInheritable: { type: Boolean, default: true },
  exclusiveTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
});

module.exports = mongoose.model('Assist', assistSchema);
