// models/Build.js
const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  name: { type: String, required: true },

  hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero', required: true },

  ivs: {
    boon: {
      type: String,
      enum: ['HP', 'Atk', 'Spd', 'Def', 'Res', 'Neutral'],
      default: 'Neutral'
    },
    bane: {
      type: String,
      enum: ['HP', 'Atk', 'Spd', 'Def', 'Res', 'Neutral'],
      default: 'Neutral'
    }
  },

  merge: { type: Number, default: 0 },
  dragonflowers: { type: Number, default: 0 },
  blessing: {
    type: String,
    enum: [
      'None',
      'Fire',
      'Water',
      'Wind',
      'Earth',
      'Light',
      'Dark',
      'Astra',
      'Anima'
    ],
    default: 'None'
  },

  ascendedAsset: {
    type: String,
    enum: ['HP', 'Atk', 'Spd', 'Def', 'Res', 'None'],
    default: 'None'
  },

  equipment: {
    weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
    assist: { type: mongoose.Schema.Types.ObjectId, ref: 'Assist' },
    special: { type: mongoose.Schema.Types.ObjectId, ref: 'Special' },
    aSkill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    bSkill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    cSkill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
    seal: { type: mongoose.Schema.Types.ObjectId, ref: 'Seal' },
  },

  statBoosts: {
    sp: { type: Number, default: 0 },
    hm: { type: Number, default: 0 },
    resplendent: { type: Boolean, default: false }
  },

  creatorNote: String,
  isPublic: { type: Boolean, default: true },
  rating: { type: Number, min: 0, max: 5 },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Build', buildSchema);
