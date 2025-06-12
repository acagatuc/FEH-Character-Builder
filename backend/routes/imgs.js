const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const imageRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../config/conn");

imageRoutes.route("/images/:name").get(function (req, res) {
  let img_db = dbo.getS3();
  console.log("hello");
  var parameters = { Bucket: "fehportraits", Key: req.params.name };
  img_db.getObject(parameters, function (err, data) {
    if (err) {
      return res.send({ error: err });
    }
    let returnData = Buffer.from(data.Body).toString("base64");
    res.send({ returnData });
  });
});

module.exports = imageRoutes;
