const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const mongo = require('mongodb').MongoClient;
const clientInfo = require('./exports/clientInfo.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongo.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {
    console.log(err);

    return;
  }
  

  
  var db = client.db('local');

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\public\\index.htm');
  });

  app.get('/main', function (req, res) {
    res.sendFile(__dirname + '\\public\\main.htm');
  });

  app.post('/newClient', function (req, res) {
    var body = req.body;

    clientInfo.newClient(db.collection('users'), {
      username: body.username,
      title: body.title,
      first: body.first,
      middle: body.middle,
      last: body.last,
      email: body.email,
      industries: body['industries[]']
    }, function(user) {
      res.send(user)
    });
  });

  app.post('/updateClient', function() {

  });

  app.get('/getClient', function() {
    db.collection('user').findOne({username: body.username})
  });

  app.listen(3000, function () {
    console.log('Website listening on port 3000');
  });
});