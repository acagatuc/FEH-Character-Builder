const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const skillRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//id is the weapontype, name is the hero name for prefs
skillRoutes.route("/GenericWeapons/:id/:name").get(async function (req, res) {
  let db_connect = dbo.getDb();
  var genericWeapons = await db_connect
    .collection("GenericWeapons")
    .find({
      type: req.params.id,
      maxSkill: "TRUE",
    })
    .toArray();
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }
  var prefWeapons = await db_connect
    .collection("PrefWeapons")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();

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
skillRoutes.route("/Assist/:move/:weapon/:name").get(async function (req, res) {
  var w = req.params.weapon.toLowerCase();
  let db_connect = dbo.getDb();
  var nonUniqueSkills = await db_connect
    .collection("Assist")
    .find({
      maxSkill: "TRUE",
      weaponRestrictions: { $regex: w },
    })
    .toArray();
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }
  var uniqueSkills = await db_connect
    .collection("Assist")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the Special skills.
skillRoutes.route("/Specials/:move/:weapon/:name").get(async function (req, res) {
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
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }
  var uniqueSkills = await db_connect
    .collection("Specials")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the A_Slot skills.
skillRoutes.route("/A_Slot/:move/:weapon/:name").get(async function (req, res) {
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
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }
  var uniqueSkills = await db_connect
    .collection("A_Slot")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the A_Slot skills.
skillRoutes.route("/B_Slot/:move/:weapon/:name").get(async function (req, res) {
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
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }
  var uniqueSkills = await db_connect
    .collection("B_Slot")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the C_Slot skills.
skillRoutes.route("/C_Slot/:move/:weapon/:name").get(async function (req, res) {
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
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }
  var uniqueSkills = await db_connect
    .collection("C_Slot")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, unique: "TRUE" }));

  res.json(finalArray);
});

// This section will help you get a list of all the S_Slot skills.
skillRoutes.route("/S_Slot/:move/:weapon/:name").get(async function (req, res) {
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
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }
  var uniqueSkills = await db_connect
    .collection("S_Slot")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();

  var finalArray = [];
  nonUniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "FALSE" }));
  uniqueSkills.forEach((element) => finalArray.push({ name: element.name, visibleStats: element.visibleStats, unique: "TRUE" }));

  res.json(finalArray);
});

module.exports = skillRoutes;
