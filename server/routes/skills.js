const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const skillRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// get one skill back based on skill name
skillRoutes.route("/Loadout/:id").get(async function (req, res) {
  let db_connect = dbo.getDb();
  // get hero to access skills
  var hero = db_connect
    .collection("Heroes")
    .find({ _id: ObjectId(req.params.id) })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });

  console.log(hero);

  // get weapon
  var weapon = await db_connect.collection("PrefWeapons").find({ heroesList: { $regex: "," + req.params.name + "," } });

  // get assist
  // var assist = await db_connect.collection("Assist").find({name: })

  var finalSkillArray = [];
  finalSkillArray.append(weapon.toArray());
  res.json(finalSkillArray);
});

skillRoutes.route("/AllSkills/:move/:weapon/:character_id").get(async function (req, res) {
  const start = Date.now();
  let db = dbo.getDb();

  Promise.all([
    queryPromise(
      "GenericWeapons",
      {
        type: req.params.weapon,
      },
      { _id: 0, name: 1, might: 1, visibleStats: 1, refine: 1, maxSkill: 1, rearmed: 1, uniqueRefine: 1, genericRefine: 1, maxSkill: 1 }
    ),
    queryPromise(
      "PrefWeapons",
      {
        heroesList: req.params.character_id,
      },
      { _id: 0, name: 1, might: 1, visibleStats: 1, refine: 1, uniqueRefine: 1, genericRefine: 1, maxSkill: 1 }
    ),
    queryPromise(
      "Assist",
      {
        $or: [
          {
            weaponRestrictions: { $regex: req.params.weapon.toLowerCase() },
          },
          { heroesList: req.params.character_id },
        ],
      },
      { _id: 0, name: 1, unique: 1, maxSkill: 1 }
    ),
    queryPromise(
      "Specials",
      {
        $or: [
          {
            weaponRestrictions: { $regex: req.params.weapon.toLowerCase() },
            movementRestrictions: { $regex: req.params.move.toLowerCase() },
          },
          { heroesList: req.params.character_id },
        ],
      },
      { _id: 0, name: 1, unique: 1, maxSkill: 1 }
    ),
    queryPromise(
      "A_Slot",
      {
        $or: [
          {
            weaponRestrictions: { $regex: req.params.weapon.toLowerCase() },
            movementRestrictions: { $regex: req.params.move.toLowerCase() },
          },
          { heroesList: req.params.character_id },
        ],
      },
      { _id: 0, name: 1, visibleStats: 1, unique: 1, maxSkill: 1 }
    ),
    queryPromise(
      "B_Slot",
      {
        $or: [
          {
            weaponRestrictions: { $regex: req.params.weapon.toLowerCase() },
            movementRestrictions: { $regex: req.params.move.toLowerCase() },
          },
          { heroesList: req.params.character_id },
        ],
      },
      { _id: 0, name: 1, unique: 1, maxSkill: 1 }
    ),
    queryPromise(
      "C_Slot",
      {
        $or: [
          {
            weaponRestrictions: { $regex: req.params.weapon.toLowerCase() },
            movementRestrictions: { $regex: req.params.move.toLowerCase() },
          },
          { heroesList: req.params.character_id },
        ],
      },
      { _id: 0, name: 1, unique: 1, maxSkill: 1 }
    ),
  ])
    .then(function (result) {
      // result is an array of responses here
      console.log("getting skills took " + (Date.now() - start) + " milliseconds");
      res.json({
        weaponList: result[0].concat(result[1]),
        assistList: result[2],
        specialList: result[3],
        aList: result[4],
        bList: result[5],
        cList: result[6],
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

//id is the weapontype, name is the hero name for prefs
skillRoutes.route("/GenericWeapons/:weapon_type/:character_id").get(async function (req, res) {
  let db_connect = dbo.getDb();
  var genericWeapons = await db_connect
    .collection("GenericWeapons")
    .find({
      type: req.params.weapon_type,
      maxSkill: "TRUE",
    })
    .toArray();
  var prefWeapons = await db_connect.collection("PrefWeapons").find({ heroesList: req.params.character_id }).toArray();
  var finalArray = [];
  genericWeapons.forEach((element) =>
    finalArray.push({
      name: element.name,
      might: element.might,
      visibleStats: element.visibleStats,
      refine: element.refine,
      rearmed: element.rearmed,
    })
  );
  prefWeapons.forEach((element) =>
    finalArray.push({ name: element.name, might: element.might, visibleStats: element.visibleStats, refine: element.refine, rearmed: "No" })
  );

  res.json(finalArray);
});

skillRoutes.route("/Refines/:name").get(async function (req, res) {
  let db_connect = dbo.getDb();
  var element = await db_connect.collection("Refines").findOne({ name: req.params.name });
  res.json({ name: element.name, uniqueRefine: element.uniqueRefine, genericRefine: element.genericRefine });
});

// This section will help you get a list of all the Assist skills.
skillRoutes.route("/Assist/:move/:weapon/:character_id").get(async function (req, res) {
  var w = req.params.weapon.toLowerCase();
  let db_connect = dbo.getDb();
  var skills = await db_connect
    .collection("Assist")
    .find({
      $or: [
        {
          maxSkill: "TRUE",
          weaponRestrictions: { $regex: w },
        },
        { heroesList: req.params.character_id },
      ],
    })
    .toArray();
  // var uniqueSkills = await db_connect.collection("Assist").find({ heroesList: req.params.character_id }).toArray();

  // var finalArray = [];
  // nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  // uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(skills);
});

// This section will help you get a list of all the Special skills.
skillRoutes.route("/Specials/:move/:weapon/:character_id").get(async function (req, res) {
  var w = req.params.weapon.toLowerCase();
  var m = req.params.move.toLowerCase();
  if (m === "armored") {
    m = "armor";
  }
  let db_connect = dbo.getDb();
  var nonUniqueSkills = await db_connect
    .collection("Specials")
    .find({
      maxSkill: "TRUE",
      weaponRestrictions: { $regex: w },
      movementRestrictions: { $regex: m },
    })
    .toArray();
  var uniqueSkills = await db_connect.collection("Specials").find({ heroesList: req.params.character_id }).toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the A_Slot skills.
skillRoutes.route("/A_Slot/:move/:weapon/:character_id").get(async function (req, res) {
  var w = req.params.weapon.toLowerCase();
  var m = req.params.move.toLowerCase();
  if (m === "armored") {
    m = "armor";
  }
  let db_connect = dbo.getDb();
  var nonUniqueSkills = await db_connect
    .collection("A_Slot")
    .find({
      maxSkill: "TRUE",
      movementRestrictions: { $regex: m },
      weaponRestrictions: { $regex: w },
    })
    .toArray();
  var uniqueSkills = await db_connect.collection("A_Slot").find({ heroesList: req.params.character_id }).toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the A_Slot skills.
skillRoutes.route("/B_Slot/:move/:weapon/:character_id").get(async function (req, res) {
  var w = req.params.weapon.toLowerCase();
  var m = req.params.move.toLowerCase();
  if (m === "armored") {
    m = "armor";
  }
  let db_connect = dbo.getDb();
  var nonUniqueSkills = await db_connect
    .collection("B_Slot")
    .find({
      maxSkill: "TRUE",
      movementRestrictions: { $regex: m },
      weaponRestrictions: { $regex: w },
    })
    .toArray();
  var uniqueSkills = await db_connect.collection("B_Slot").find({ heroesList: req.params.character_id }).toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the C_Slot skills.
skillRoutes.route("/C_Slot/:move/:weapon/:character_id").get(async function (req, res) {
  var w = req.params.weapon.toLowerCase();
  var m = req.params.move.toLowerCase();
  if (m === "armored") {
    m = "armor";
  }
  let db_connect = dbo.getDb();
  var nonUniqueSkills = await db_connect
    .collection("C_Slot")
    .find({
      maxSkill: "TRUE",
      movementRestrictions: { $regex: m },
      weaponRestrictions: { $regex: w },
    })
    .toArray();
  var uniqueSkills = await db_connect.collection("C_Slot").find({ heroesList: req.params.character_id }).toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the S_Slot skills.
skillRoutes.route("/S_Slot/:move/:weapon").get(async function (req, res) {
  var w = req.params.weapon.toLowerCase();
  var m = req.params.move.toLowerCase();
  if (m === "armored") {
    m = "armor";
  }
  let db_connect = dbo.getDb();
  var nonUniqueSkills = await db_connect
    .collection("S_Slot")
    .find({
      maxSkill: "TRUE",
      movementRestrictions: { $regex: m },
      weaponRestrictions: { $regex: w },
    })
    .toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "TRUE" }));

  res.json(finalArray);
});

module.exports = skillRoutes;
