var express = require('express');
var app = express();

var icc = require('./icconnection.js');
var iccon = new icc();

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('welcome');
});

app.get('/pins/:nr', function(req, res) {
    iccon.setPin(req.params.nr, 1);
});

app.get('/temp/', function(req, res){

});

app.listen(80);
console.log('Server listening op port 80');
