// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com
var express = require('express');
var fs = require('fs');

var scheduler = require('./scheduler.js');
var db = require('./db.js');

var iccon = require('./icconnection.js');

var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

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

app.get('/pins/allon', function(req, res) {
    iccon.allOn();
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
app.get('/templog/:nr', function(req, res) {
    db.getDb().all('select * from temperatures order by time asc limit ?', req.params.nr, function(err, rows) {
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

//show devices
app.get('/devices', function(req, res){
    db.getDb().all('select * from devices ', function(err, rows){
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

//post device
app.post('/devices', function(req, res) {
    var name = req.param('name');
    var pinnumber = req.param('pinnumber');
    if(name == null || pinnumber == null) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }
  db.getDb().run('insert into devices (name, pinnumber) values (?,?)', name, pinnumber);
  res.json(true);
});

//delete device
app.delete('/devices', function(req, res) {
    var id = req.param('id');
    if(id == null){
        res.statusCode = 400;
        return res.send('Error 400: delete syntax incorrect.');
    }
    db.getDb().run('delete from devices where devices.id = ?', id);
    res.json(true);
});


//update device
app.put('/devices', function(req, res){
    var id = req.param('id');
    var name = req.param('name');
    var pinnumber = req.param('pinnumber');
    if(id == null || name == null || pinnumber == null){
        res.statusCode = 400;
        return res.send('Error 400: update syntax incorrect.');
    }
    db.getDb().run('update devices set devices.name = ?, devices.pinnumber = ? where devices.id = ?', name, pinnumber, id);
    res.json(true);
});


app.listen(8080);
console.log('Server listening op port 8080');


