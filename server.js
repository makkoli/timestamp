var express = require('express');
var retrieveDate = require('./retrievedate');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:date', function (req, res) {
  res.status(200);
  res.set('Content-Type', 'text/plain');
  res.charset = 'utf-8';
  res.send(retrieveDate.getDate(req.params.date));
});

app.listen(8080);
