var DATABASE_URL = process.env.DATABASE_URL

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM note', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})

app.get('/allNotes', function(request, response) {
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM note', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { /*response.render('pages/db', {results: result.rows} );*/
          response.send(result.rows);
        }
    });
  });
});
