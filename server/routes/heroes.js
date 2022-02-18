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
    skills: req.body.skills,
    recommended: req.body.recommended,
    hero_type: req.body.hero_type,
    single_name: req.body.single_name,
  };
  db_connect.collection("Heroes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

heroRoutes.route("/Heroes").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Heroes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = heroRoutes;
