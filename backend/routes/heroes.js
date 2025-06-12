const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const heroRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new record.
heroRoutes.route("/Heroes/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(db_connect);
  let myobj = {
    name: req.body.name,
    title: req.body.title,
    move_type: req.body.move_type,
    weapon_type: req.body.weapon_type,
    hp: req.body.hp,
    atk: req.body.atk,
    spd: req.body.spd,
    def: req.body.def,
    res: req.body.res,
    superboon: req.body.superboon,
    superbane: req.body.superbane,
    weapons: req.body.weapons,
    assists: req.body.assists,
    specials: req.body.specials,
    passives: req.body.passives,
    recommended: req.body.recommended,
    hero_type: req.body.hero_type,
    single_name: req.body.single_name,
    EVA: req.body.eVA,
    JVA: req.body.jVA,
    Artist: req.body.Artist,
    dragonflowers: req.body.dragonflowers,
  };
  db_connect.collection("Heroes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

heroRoutes.route("/Heroes").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Hero List")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

heroRoutes.route("/Heroes/:id").get(async function (req, res) {
  const start = Date.now();
  let db = dbo.getDb();

  Promise.all([queryPromise("Heroes", { _id: ObjectId(req.params.id) }, {}), queryPromise("RecommendedBuilds", { character_id: req.params.id }, {})])
    .then(function (result) {
      // result is an array of responses here
      console.log("getting hero took " + (Date.now() - start) + " milliseconds");
      res.json({
        hero: result[0][0],
        recommended: result[1],
      });
    })
    .catch(function (err) {
      console.log(err);
      db.close();
    });

  function queryPromise(collection, query, fields) {
    return new Promise(function (resolve, reject) {
      db.collection(collection)
        .find(query)
        .project(fields)
        .toArray(function (err, resp) {
          if (err) {
            reject(err);
          } else {
            resolve(resp);
          }
        });
    });
  }
});

heroRoutes.route("/LegendaryMythic/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(db_connect);
  let myobj = {
    name: req.body.name,
    blessing: req.body.blessing,
    stats: req.body.stats,
  };
  db_connect.collection("LegendaryMythic").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

heroRoutes.route("/LegendaryMythic/:blessing").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("LegendaryMythic")
    .find({ blessing: { $regex: req.params.blessing.toLowerCase() } })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = heroRoutes;
