const express = require('express');
const router = express.Router();
const { addHeroesBulk, addBulkList, addBulkBlessings, getHeroList, getHero, getHeroImage, getLMList } = require('../controllers/heroController');

// post api routes
router.post('/bulk', addHeroesBulk);
router.post('/bulklist', addBulkList)
router.post('/bulkblessings', addBulkBlessings)

// get api routes
router.get('/', getHeroList)
router.get('/lm/:blessing', getLMList)
router.get('/hero/:heroId', getHero)
router.get('/heroimage/:heroName', getHeroImage)

module.exports = router