const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const skillRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the Weapons.
skillRoutes.route("/Weapons").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Weapons")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the Weapons.
skillRoutes.route("/GenericWeapons").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("GenericWeapons")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//id is the weapontype, name is the hero name for prefs
skillRoutes.route("/GenericWeapons/:id/:name").get(async function (req, res) {
  let db_connect = dbo.getDb();
  var toSend = await db_connect
    .collection("GenericWeapons")
    .find({ type: req.params.id, maxSkill: "TRUE" })
    .toArray();
  var name = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    name = req.params.name.replace(/[()]/g, "");
    name = req.params.name.replace(/[()]/g, "");
  }

  var eh = await db_connect
    .collection("PrefWeapons")
    .find({ heroesList: { $regex: "," + name + "," } })
    .toArray();
  eh.forEach((element) => toSend.push(element));

  toSend.sort(function (a, b) {
    var nameA = a.name; // ignore upper and lowercase
    var nameB = b.name; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  res.json(toSend);
});

skillRoutes.route("/Weapons/:id/:weapon").get(async function (req, res) {
  let db_connect = dbo.getDb();

  // gets the non-unique weapons
  var toSend = await db_connect
    .collection("Weapons")
    .find({ type: req.params.id, unique: "No", maxSkill: "TRUE" })
    .toArray();
  if (!toSend.some((item) => item.name === req.params.weapon)) {
    // will have to change for heroes that can learn different iterations of weapons(i.e. lucina)

    // add a column that details which heroes can wield unique weapons, then search by the name of the hero?
    // add another url parameter and use .find({heroName: {$regex : "*,req.params.heroName,*"}})
    toSend.push(
      await db_connect
        .collection("Weapons")
        .findOne({ name: req.params.weapon, type: req.params.id })
    );
  }
  toSend.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  res.json(toSend);
});
// This section will help you create a new record.
skillRoutes.route("/PrefWeapons/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    might: req.body.might,
    visibleStats: req.body.visibleStats,
    sp: req.body.sp,
    refine: req.body.refine,
    heroesList: req.body.heroesList,
  };
  db_connect.collection("PrefWeapons").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

skillRoutes.route("/Refines/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    uniqueRefine: req.body.uniqueRefine,
    genericRefine: req.body.genericRefine,
    img: req.body.img,
  };
  db_connect.collection("Refines").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

skillRoutes.route("/Refines/:name").get(async function (req, res) {
  let db_connect = dbo.getDb();
  var array = await db_connect
    .collection("Refines")
    .findOne({ name: req.params.name });

  res.json(array);
});

// This section will help you create a new record.
skillRoutes.route("/GenericWeapons/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(db_connect);
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    might: req.body.might,
    visibleStats: req.body.visibleStats,
    sp: req.body.sp,
    refine: req.body.refine,
    maxSkill: req.body.maxSkill,
  };
  db_connect.collection("GenericWeapons").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
// This section will help you get a list of all the Assist skills.
skillRoutes.route("/Assist/:type").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Assist")
    .find({ staffOnly: req.params.type, maxSkill: "TRUE", unique: "FALSE" })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

skillRoutes.route("/Assist/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    sp: req.body.sp,
    maxSkill: req.body.maxSkill,
    staffOnly: req.body.staffOnly,
    unique: req.body.unique,
    heroList: req.body.heroesList,
  };
  db_connect.collection("Assist").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you get a list of all the Special skills.
skillRoutes.route("/Specials/:name").get(async function (req, res) {
  let db_connect = dbo.getDb();
  var toSend = await db_connect
    .collection("Specials")
    .find({ unique: "FALSE", maxSkill: "TRUE" })
    .toArray();
  var eh = req.params.name;
  if (req.params.name.includes("(") || req.params.name.includes(")")) {
    eh = req.params.name.replace(/[()]/g, "");
    eh = req.params.name.replace(/[()]/g, "");
  }
  // will have to change for heroes that can learn different iterations of weapons(i.e. lucina)
  // add a column that details which heroes can wield unique weapons, then search by the name of the hero?
  // add another url parameter and use .find({heroName: {$regex : "*,req.params.heroName,*"}})
  var personalSkill = await db_connect
    .collection("Specials")
    .findOne({ heroList: { $regex: "," + eh + "," } });
  if (personalSkill) {
    toSend.push(personalSkill);
  }

  toSend.sort(function (a, b) {
    var nameA = a.name; // ignore upper and lowercase
    var nameB = b.name; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  res.json(toSend);
});

skillRoutes.route("/Specials/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    description: req.body.description,
    sp: req.body.sp,
    maxSkill: req.body.maxSkill,
    staffOnly: req.body.staffOnly,
    unique: req.body.unique,
    heroList: req.body.heroesList,
    cd: req.body.cd,
  };
  db_connect.collection("Specials").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you get a list of all the A_Slot skills.
skillRoutes.route("/A_Slot").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("A_Slot")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the B_Slot skills.
skillRoutes.route("/B_Slot").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("B_Slot")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the C_Slot skills.
skillRoutes.route("/C_Slot").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("C_Slot")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the S_Slot skills.
skillRoutes.route("/S_Slot").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("S_Slot")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
skillRoutes.route("/A_Slot/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("A_Slot").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
skillRoutes.route("/A_Slot/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(db_connect);
  let myobj = {
    name: req.body.name,
    img: req.body.img,
    description: req.body.description,
    visibleStats: req.body.visibleStats,
    unique: req.body.unique,
  };
  db_connect.collection("A_Slot").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new record.
skillRoutes.route("/B_Slot/add").post(function (req, response) {
  console.log(req);
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    img: req.body.img,
    description: req.body.description,
  };
  db_connect.collection("B_Slot").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you create a new record.
skillRoutes.route("/C_Slot/add").post(function (req, response) {
  console.log(req);
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    img: req.body.img,
    description: req.body.description,
  };
  db_connect.collection("C_Slot").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
skillRoutes.route("/A_Slot/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("A_Slot")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = skillRoutes;
