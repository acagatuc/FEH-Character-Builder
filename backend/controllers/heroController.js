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

// This section will help you create a new record.
// heroRoutes.route("/Heroes/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   console.log(db_connect);
//   let myobj = {
//     name: req.body.name,
//     title: req.body.title,
//     move_type: req.body.move_type,
//     weapon_type: req.body.weapon_type,
//     hp: req.body.hp,
//     atk: req.body.atk,
//     spd: req.body.spd,
//     def: req.body.def,
//     res: req.body.res,
//     superboon: req.body.superboon,
//     superbane: req.body.superbane,
//     weapons: req.body.weapons,
//     assists: req.body.assists,
//     specials: req.body.specials,
//     passives: req.body.passives,
//     recommended: req.body.recommended,
//     hero_type: req.body.hero_type,
//     single_name: req.body.single_name,
//     EVA: req.body.eVA,
//     JVA: req.body.jVA,
//     Artist: req.body.Artist,
//     dragonflowers: req.body.dragonflowers,
//   };
//   db_connect.collection("Heroes").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// heroRoutes.route("/Heroes").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   db_connect
//     .collection("Hero List")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

// heroRoutes.route("/Heroes/:id").get(async function (req, res) {
//   const start = Date.now();
//   let db = dbo.getDb();

//   Promise.all([queryPromise("Heroes", { _id: ObjectId(req.params.id) }, {}), queryPromise("RecommendedBuilds", { character_id: req.params.id }, {})])
//     .then(function (result) {
//       // result is an array of responses here
//       console.log("getting hero took " + (Date.now() - start) + " milliseconds");
//       res.json({
//         hero: result[0][0],
//         recommended: result[1],
//       });
//     })
//     .catch(function (err) {
//       console.log(err);
//       db.close();
//     });

//   function queryPromise(collection, query, fields) {
//     return new Promise(function (resolve, reject) {
//       db.collection(collection)
//         .find(query)
//         .project(fields)
//         .toArray(function (err, resp) {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(resp);
//           }
//         });
//     });
//   }
// });

// heroRoutes.route("/LegendaryMythic/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   console.log(db_connect);
//   let myobj = {
//     name: req.body.name,
//     blessing: req.body.blessing,
//     stats: req.body.stats,
//   };
//   db_connect.collection("LegendaryMythic").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// heroRoutes.route("/LegendaryMythic/:blessing").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   db_connect
//     .collection("LegendaryMythic")
//     .find({ blessing: { $regex: req.params.blessing.toLowerCase() } })
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

module.exports = {
  addHeroesBulk,
  addBulkList,
  addBulkBlessings,
  getHeroList,
  getHero,
  getHeroImage
};
