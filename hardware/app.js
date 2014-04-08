// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com
var express = require('express');
var fs = require('fs');

var scheduler = require('./scheduler.js');
var db = require('./db.js');

var icc = require('./icconnection.js');
var iccon = new icc();

var app = express();

//useless atm
app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('not welcome');
});

//gets a status of all pins in json format
app.get('/pins', function(req, res) {
    res.json(iccon.getStatus());
});

//turns all pins off
app.get('/pins/alloff', function(req, res) {
    iccon.allOff();
    res.end();
});

//gets 0 for a disabled pin or 1 for an enabled pin
app.get('/pins/:nr', function(req, res) {
    if (!iccon.isPinValid(req.params.nr)) {
        res.status(404).send('Not found');
        return;
    }
    res.send(iccon.getPin(req.params.nr).toString());
});

//puts a pin off
app.get('/pins/:nr/off', function(req, res) {
    if (!iccon.isPinValid(req.params.nr)) {
        res.status(404).send('Not found');
        return;
    }
    iccon.setPin(req.params.nr, 0);
    res.end();
});

//puts a pin on
app.get('/pins/:nr/on', function(req, res) {
    if (!iccon.isPinValid(req.params.nr)) {
        res.status(404).send('Not found');
        return;
    }
    iccon.setPin(req.params.nr, 1);
    res.end();
});

//gets the current temperature
app.get('/temp', function(req, res) {
    fs.readFile('/sys/bus/w1/devices/10-000802aafc40/w1_slave', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status('500').send('db error');
            res.end();
            return;
        }
        var temp = (data.split('\n')[1].split(' ')[9].split('=')[1]) / 1000;
        res.type('text/plain');
        res.send(temp.toString());
        res.end();
    });
});

//gets all temperatures
app.get('/templog', function(req, res) {
    db.getDb().all('select * from temperatures', function(err, rows) {
        if (err) {
            console.log(err);
            res.status('500').send('db error');
            res.end();
            return;
        }
        res.send(rows);
        res.end();
    });
});


app.listen(80);
console.log('Server listening op port 80');
