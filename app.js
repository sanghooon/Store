var express = require('express');
//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
var exphbs = require('express-handlebars');
//var engines = require('consolidate');
var app = express();

/* using nunjucks
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
*/

app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

const home = require('./controllers/home');
const new_form = require('./controllers/new_form');

app.use('/', home);
app.use('/new_form', new_form);

/*
MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

  assert.equal(null, err);
  console.log("Connected to MongoDB!");

  app.get('/', function(req, res) {
    db.collection('movies').find({}).toArray(function(err, docs) {
      res.render('movies/list', { 'movies': docs } );
    });
  });

  app.post('/', function(req, res) {
    db.collection('movies').insertOne(
              { 'title': req.body.title, 'year': req.body.year, 'imbd': req.body.imbd },
              function (err, r) {
                  assert.equal(null, err);
                  res.send("Document inserted with _id: " + r.insertedId);
              }
          );
  });

  app.use(function(req, res) {
    res.sendStatus(404);
  });

});
*/



module.exports = app;
app.listen(3000, function() {
  console.log('Server running on port 3000.');
});
