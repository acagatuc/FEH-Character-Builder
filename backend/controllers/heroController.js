const { Hero, HeroList, Blessing } = require('../models/Hero')
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// AWS S3 config
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * POST /api/heroes/bulk
 * Body: JSON array of hero objects
 */
const addHeroesBulk = async (req, res) => {
  try {
    const heroes = req.body;

    if (!Array.isArray(heroes) || heroes.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of heroes' });
    }

    const insertedHeroes = await Hero.insertMany(heroes, { ordered: false }); // continues even if some fail
    res.status(201).json({
      message: `${insertedHeroes.length} heroes added successfully`,
      data: insertedHeroes,
    });
  } catch (error) {
    console.error('Bulk insert error:', error);
    res.status(500).json({ message: 'Error adding heroes', error: error.message });
  }
};

/**
 * POST /api/heroes/bulklist
 * Body: JSON array of hero objects
 */
const addBulkList = async (req, res) => {
  try {
    const heroes = req.body;

    if (!Array.isArray(heroes) || heroes.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of heroes' });
    }

    const insertedHeroes = await HeroList.insertMany(heroes, { ordered: false }); // continues even if some fail
    res.status(201).json({
      message: `${insertedHeroes.length} heroes added to list successfully`,
      data: insertedHeroes,
    });
  } catch (error) {
    console.error('Bulk insert error:', error);
    res.status(500).json({ message: 'Error adding heroes', error: error.message });
  }
}

/**
 * POST /api/heroes/bulkblessings
 * Body: JSON array of blessing hero objects
 */
const addBulkBlessings = async (req, res) => {
  try {
    const blessings = req.body;

    if (!Array.isArray(blessings) || blessings.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of heroes' });
    }

    const insertedBlessingHeroes = await Blessing.insertMany(blessings, { ordered: false }); // continues even if some fail
    res.status(201).json({
      message: `${insertedBlessingHeroes.length} heroes added to list successfully`,
      data: insertedBlessingHeroes,
    });
  } catch (error) {
    console.error('Bulk insert error:', error);
    res.status(500).json({ message: 'Error adding heroes', error: error.message });
  }
}


const getHeroList = async (req, res) => {
  try {
    const heroes = await HeroList.find();
    res.status(200).json(heroes);
  } catch (err) {
    console.error('Error fetching heroes:', err);
    res.status(500).json({ message: 'Server error fetching heroes' });
  }
}

const getHero = async (req, res) => {
  try {
    const hero = await Hero.find({_id: req.params.heroId});
      res.status(200).json(hero);
  } catch (err) {
    console.error('Error fetching heroes:', err);
    res.status(500).json({ message: 'Server error fetching hero ' });
  }
}

const getHeroImage = async (req, res) => {
  const { heroName } = req.params;

  try {
    // Optional: Generate a signed URL (if the object is private)
    const command = new GetObjectCommand({
      Bucket: 'fehportraits',
      Key: heroName
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 }); // 60 seconds

    // Redirect or stream directly
    res.redirect(url); // OR stream below if you prefer:
    
    // const s3Stream = await s3.send(command);
    // s3Stream.Body.pipe(res);

  } catch (err) {
    console.error('Error retrieving image:', err);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
}

module.exports = {
  addHeroesBulk,
  addBulkList,
  addBulkBlessings,
  getHeroList,
  getHero,
  getHeroImage
};
