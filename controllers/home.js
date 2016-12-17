var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

  assert.equal(null, err);
  console.log("Connected to MongoDB!");

  router.get('/', function(req, res) {
    db.collection('movies').find({}).toArray(function(err, docs) {
      res.render('movies/list', { 'movies': docs } );
    });
  });

  router.use(function(req, res) {
    res.sendStatus(404);
  });

});

module.exports = router;
