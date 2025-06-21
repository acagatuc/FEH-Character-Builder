// models/Hero.js
const mongoose = require('mongoose');

heroPointerSchema = new mongoose.Schema({
  full_name: { type: String, required: true, unique: true },
  category: { type: String },
  gender: { type: String, enum: ['Male', 'Female', '']},
  common_name: { type: String, required: true, unique: true },
  game: { type: String },
  backpack: { type: String }
})

heroBlessingSchema = new mongoose.Schema({
  hero_name: { type: String, required: true},
  blessing: { type: String, required: true },
  bonus: { type: String },
  boost: [Number]
})

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

  category: { type: String },

  weaponType: { type: String, required: true },
  movementType: { type: String, required: true },

  // stats
  baseStats1: {
    hp: [Number],
    atk: [Number],
    spd: [Number],
    def: [Number],
    res: [Number]
  },
  baseStats40: {
    hp: [Number],
    atk: [Number],
    spd: [Number],
    def: [Number],
    res: [Number]
  },
  superboons: [String],
  superbanes: [String],

  // skills (change these to arrays of ALL skills)
  weapons: [String],
  assists: [String],
  specials: [String],
  passives: [String],

  // images location in the store
  hasResplendent: { type: Boolean, default: false },
  // imageUrl: String,
  // chibiUrl: String,

  // todo
  // recommendedBuilds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Build' }]
});

const heroModel = mongoose.model('Hero', heroSchema)
const heroPointer = mongoose.model('HeroList', heroPointerSchema)
const blessing = mongoose.model('Blessing', heroBlessingSchema)

module.exports = { Hero: heroModel, HeroList: heroPointer, Blessing: blessing};
