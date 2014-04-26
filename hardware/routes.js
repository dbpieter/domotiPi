var fs = require('fs');
var db = require('./db.js');
var iccon = require('./icconnection.js');

var scheduler = require('./scheduler.js');

module.exports = function(app) {

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

    //puts all pins on
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
    app.get('/devices', function(req, res) {
        db.getDb().all('select * from devices ', function(err, rows) {
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

    //Add device
    app.post('/devices', function(req, res) {
        var name = req.param('name');
        var pinnumber = req.param('pin');
        if (name === null || pinnumber === null) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }
        db.getDb().run('insert into devices (name, pin) values (?,?)', name, pinnumber);
        res.json(true);
    });

    //Delete device
    app.delete('/devices', function(req, res) {
        var id = req.param('id');
        if (id === null) {
            res.statusCode = 400;
            return res.send('Error 400: delete syntax incorrect.');
        }
        db.getDb().run('delete from devices where devices.id = ?', id);
        res.json(true);
    });


    //Update device
    app.put('/devices', function(req, res) {
        var id = req.param('id');
        var name = req.param('name');
        var pinnumber = req.param('pin');
        if (id === null || name == null || pinnumber === null) {
            res.statusCode = 400;
            return res.send('Error 400: update syntax incorrect.');
        }
        db.getDb().run('update devices set name = ?, pin = ? where id = ?', name, pinnumber, id);
        res.json(true);
    });

    //Show all schedules
    app.get('/schedules', function(req, res) {
        db.getDb().all('select * from schedules', function(err, rows) {
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

    //Add schedule 
    app.post('/schedules', function(req, res) {
        var name = req.param('name');
        var enabled = req.param('enabled');

        if (name === null || enabled === null) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }
        db.getDb().run('insert into schedules (name, enabled) values (?,?)', name, enabled);
        res.json(true);
    });

    //Update schedule
    app.put('/schedules', function(req, res) {
        var id = req.param('id');
        var name = req.param('name');
        var enabled = req.param('enabled');
        if (id === null || name === null || enabled === null) {
            res.statusCode = 400;
            return res.send('Error 400: update syntax incorrect.');
        }
        db.getDb().run('update schedules set name = ?, enabled = ? where id = ?', name, enabled, id);
        res.json(true);
    });

    //Delete schedule + Rules
    app.delete('/schedules', function(req, res) {
        var err = false;
        var id = req.param('id');
        if (id === null) {
            res.statusCode = 400;
            return res.send('Error 400: delete syntax incorrect.');
        }
        db.getDb().run('delete from rules where rules.schedules_id = ?', id, function(error){
            console.log(error);
            err = true;
        });
        db.getDb().run('delete from schedules where schedules.id = ?', id, function(error){
            console.log(error);
            err = true;
        });

        if(!err){

            scheduler.scheduleRemoved(id);
        }
        res.json(true);
    });

    //Show rules from specific schedule
    app.get('/rules', function(req, res) {
        var id = req.param('id');
        db.getDb().all('select * from rules where rules.schedules_id = ?', id , function(err, rows) {
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

    // Add rule to specific schedule
     app.post('/rules', function(req, res) {
        var err = false;
        var schedules_id = req.param('schedules_id');
        var devices_id = req.param('devices_id');
        var cron = req.param('cron');
        var onoff = req.param('onoff');

        if (name === null || enabled === null) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }
        db.getDb().run('insert into rules (devices_id, cron, schedules_id, onoff) values (?,?,?,?)', devices_id, cron, schedules_id, onoff, function(error){
            console.log(error);
            err = true;
        });
        // id ophalen 
        if(!err){
            scheduler.ruleAdded(schedules_id);
        }
        res.json(true);
    });

    //Update rules from specific schedule
    app.put('/rules', function(req, res) {
        var err = false;
        var id = req.param('id');
        var devices_id = req.param('devices_id');
        var cron = req.param('cron');
        var schedules_id = req.param('schedules_id');
        var onoff = req.param('onoff');
        if (id === null || name === null || enabled === null) {
            res.statusCode = 400;
            return res.send('Error 400: update syntax incorrect.');
        }
        db.getDb().run('update rules set devices_id = ?, cron = ?, schedules_id = ?, onoff = ? where id = ?', devices_id, cron, schedules_id, onoff, id, function(error){
            console.log(error);
            err = true;
        });
        if(!err){
            scheduler.ruleUpdated(schedules_id, id);
        }
        res.json(true);
    });
    
    
    
    
    

    //show all jobs from a schedule
    app.get('/schedules/:nr', function(req, res) {
        //TODO
    });
};