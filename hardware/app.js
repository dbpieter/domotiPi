// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com
var express = require('express');
var fs = require('fs');
var app = express();

var icc = require('./icconnection.js');
var iccon = new icc();

app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('not welcome');
});

app.get('/pins', function(req, res) {
    res.json(iccon.getStatus());
});

app.get('/pins/:nr', function(req, res) {
    if (!iccon.isPinValid(req.params.nr)) {
        res.status(404).send('Not found');
        return;
    }
    res.send(iccon.getPin(req.params.nr).toString());
});

app.get('/pins/:nr/off', function(req, res) {
    if (!iccon.isPinValid(req.params.nr)) {
        res.status(404).send('Not found');
        return;
    }
    iccon.setPin(req.params.nr, 0);
    res.end();
});

app.get('/pins/:nr/on', function(req, res) {
    if (!iccon.isPinValid(req.params.nr)) {
        res.status(404).send('Not found');
        return;
    }
    iccon.setPin(req.params.nr, 1);
    res.end();
});

app.get('/temp', function(req, res) {
    fs.readFile('/sys/bus/w1/devices/10-000802aafc40/w1_slave', 'utf8', function(err, data) {
        var temp = (data.split('\n')[1].split(' ')[9].split('=')[1]) / 1000;
        res.type('text/plain');
        res.send(temp.toString());
        res.end();
    });
});


app.listen(80);
console.log('Server listening op port 80');
