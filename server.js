var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:date', function (req, res) {
  res.send('Hello World ' + req.params.date);
});

app.listen(8080);
