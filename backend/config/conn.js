// const { MongoClient } = require("mongodb");
// const Db = process.env.MONGO_URI;
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// var AWS = require("aws-sdk");
// // Set the Region
// AWS.config.update({ region: process.env.REGION });
// // Create S3 service object
// s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// var _db;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db) {
//         _db = db.db("FEH_Skills");
//         console.log("Successfully connected to MongoDB.");
//       }
//       return callback(err);
//     });
//   },

//   getDb: function () {
//     return _db;
//   },

//   getS3: function () {
//     return s3;
//   },

//   listBuckets: function (callback) {
//     // Call S3 to list the buckets
//     s3.listBuckets(function (err, data) {
//       if (err) {
//         console.log("Error", err);
//       } else {
//         console.log("Success", data.Buckets);
//       }
//     });
//   },
// };

const mongoose = require('mongoose');
// require('dotenv').config()

const connectDB = async () => {
  let connected = false;
  console.log(process.env.MONGO_URI)
  while (!connected) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
      connected = true;
    } catch (err) {
      console.error('MongoDB connection failed, retrying in 3s...', err.message);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
};

module.exports = connectDB;
