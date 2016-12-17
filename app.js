var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const home = require('./controllers/home');
const new_form = require('./controllers/new_form');


// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res) {
      db.collection('movies').find({}).toArray(function(err, docs) {
        res.render('movies/list', { 'movies': docs } );
      });
    });

    app.get('/new', function(req, res, next) {
        res.render('movies/new', {});
    });

    app.post('/add', function(req, res, next) {
        var title = req.body.title;
        var year = req.body.year;
        var imdb = req.body.imdb;

        if ((title == '') || (year == '') || (imdb == '')) {
            next('Please provide an entry for all fields.');
        } else {
            db.collection('movies').insertOne(
                { 'title': title, 'year': year, 'imdb': imdb },
                function (err, r) {
                    assert.equal(null, err);
                    res.send("Document inserted with _id: " + r.insertedId);
                }
            );
        }
    });

    app.use(errorHandler);

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});
