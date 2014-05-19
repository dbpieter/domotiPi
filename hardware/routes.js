var fs = require('fs');
var db = require('./db.js');
var iccon = require('./icconnection.js');

var scheduler = require('./scheduler.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var user = {username: "user", password: "Azerty123"}; //temp

passport.use(new LocalStrategy(
        function(username, password, done) {
            if (username !== user.username) {
                done(null, false, {message: 'Incorrect username'});
            }
            if (password !== user.password) {
                done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);

//            User.findOne({username: username}, function(err, user) {
//                if (err) {
//                    return done(err);
//                }
//                if (!user) {
//                    return done(null, false, {message: 'Incorrect username.'});
//                }
//                if (!user.validPassword(password)) {
//                    return done(null, false, {message: 'Incorrect password.'});
//                }
//                return done(null, user);
//            });
        }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    done(null, user);
});

module.exports = function(app) {

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

        //don't check for credentials for these routes
        if (req.path === '/login' || req.path === '/logout'
                || req.path === '/loginfail' || req.path === '/') {
            next();
            return;
        }

        next();

//        if (req.isAuthenticated()) {
//            next();
//            return;
//        }
//        res.redirect('/loginfail');
    });

    app.post('/login',
            passport.authenticate('local', {successRedirect: '/',
                failureRedirect: '/loginfail'}), function(req, res) {
        console.log('someone logged in');
        db.log('someone logged in');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/loginfail', function(req, res) {
        res.type('text/plain');
        res.send(403, 'YOU SHALL NOT PASS ! (without logging in)');
        db.log('FAILED LOGIN ! DANGER DANGER AAARGH');
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
    
    
    app.get('/pins/available', function(req, res) {
        var status = iccon.getStatus();
        db.getDb().all('select * from devices;', function(err, rows) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                return;
            }
            for(var i = 0; i < rows.length; i++){
                delete status[rows[i]['pin']];
                console.log(rows[i]['pin']);
            }
            res.send(status);
        });
    });

    //turns all pins off
    app.get('/pins/alloff', function(req, res) {
        iccon.allOff();
        res.json('true');
        db.log('All devices turned off');
    });

    //puts all pins on
    app.get('/pins/allon', function(req, res) {
        iccon.allOn();
        res.json('true');
        db.log('All devices turned on');
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
        res.json('true');
        db.log('Pin '+ req.params.nr + 'turned off.');
    });

    //puts a pin on
    app.get('/pins/:nr/on', function(req, res) {
        if (!iccon.isPinValid(req.params.nr)) {
            res.status(404).send('Not found');
            return;
        }
        iccon.setPin(req.params.nr, 1);
        res.json('true');
        db.log('Pin '+ req.params.nr + 'turned on.');
    });

    //gets the current temperature
    app.get('/temp', function(req, res) {
        fs.readFile('/sys/bus/w1/devices/10-000802aafc40/w1_slave', 'utf8', function(err, data) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                return;
            }
            var temp = (data.split('\n')[1].split(' ')[9].split('=')[1]) / 1000;
            res.type('text/plain');
            console.log(temp.toString());
            res.send(temp.toString());
        });
    });

    //gets all temperatures
    app.get('/templog/:nr', function(req, res) {
        db.getDb().all('select * from temperatures order by time desc limit ?', req.params.nr, function(err, rows) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                return;
            }
            res.send(rows);
        });
    });

    //show devices
    app.get('/devices', function(req, res) {
        db.getDb().all('select * from devices;', function(err, rows) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                return;
            }
            res.send(rows);
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
        db.log('New device added: '+name+'on pin '+pinnumber);
    });

    //Delete device
    app.post('/devices/delete', function(req, res) {
        var id = req.param('id');
        if (id === null) {
            res.statusCode = 400;
            return res.send('Error 400: delete syntax incorrect.');
        }
        db.getDb().run('delete from devices where devices.id = ?', id, function(error) {
            if(error !== null){
                console.log(error);
                err = true;
            }         
        });

        res.json(true);
        db.log('Device deleted: id is '+id);
    });


    //Update device
    app.post('/devices/update', function(req, res) {
        var id = req.param('id');
        var name = req.param('name');
        var pinnumber = req.param('pin');
        if (id === null || name === null || pinnumber === null) {
            res.statusCode = 400;
            return res.send('Error 400: update syntax incorrect.');
        }
        db.getDb().run('update devices set name = ?, pin = ? where id = ?', name, pinnumber, id);
        res.json(true);
        db.log('Device updated: id is '+id);
    });
    
    //show all logs
    app.get('/logs', function(req, res) {
        db.getDb().all('select * from logs', function(err, rows) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                return;
            }
            res.send(rows);
        });
    });
    
    //show all rules
    app.get('/schedules', function(req, res) {
        db.getDb().all('select * from schedules', function(err, rows) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                return;
            }
            res.send(rows);
        });
    });

    //Add schedule
    app.post('/schedules', function(req, res) {
        var err = false;
        var name = req.param('name');
        var enabled = req.param('enabled');

        if (name === null || enabled === null) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }
        db.getDb().run('insert into schedules (name, enabled) values (?,?)', name, enabled, function(error){
            if(error !== null){
                console.log('insert error' + error);
                err = true;
            }         
        });

        if(!err){
            db.getDb().all('select max(id) from schedules', function(error, rows) {
                if (error === null) {
                    res.json(rows[0]['max(id)']);                  
                    db.log('New Schedule added: '+rows[0]['max(id)']);
                }
                else {
                    console.log(error);
                    res.status('500').send('db error');
                    err = true;
                }           
            });
        }
    });

    //Update schedule
    app.put('/schedules', function(req, res) {
        var id = req.param('id');
        var name = req.param('name');
        if (id === null || name === null || enabled === null) {
            res.statusCode = 400;
            return res.send('Error 400: update syntax incorrect.');
        }
        db.getDb().run('update schedules set name = ? where id = ?', name, id);
        res.json(true);
        db.log('Schedule updated id '+id);
    });

    //Delete schedule + Rules
    app.delete('/schedules', function(req, res) {
        var err = false;
        var id = req.param('id');
        if (id === null) {
            res.statusCode = 400;
            return res.send('Error 400: delete syntax incorrect.');
        }
        db.getDb().run('delete from rules where rules.schedules_id = ?', id, function(error) {
            console.log(error);
            err = true;
        });
        db.getDb().run('delete from schedules where schedules.schedules.id = ?', id, function(error) {
            console.log(error);
            err = true;
        });

        if (!err) {

            db.log('Schedule deleted id '+id);
            scheduler.disableSchedule(id);
        }
        res.json(err);
    });

    //Schedule enabled/disabled
    app.post('/schedules/enabled', function(req, res) {
        var err = false;
        var schedule_id = req.param('schedule_id');
        var enabled = req.param('enabled');

        if (schedule_id === null) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }
        db.getDb().run('update schedules set (enabled) values (?) where schedule_id = ?', enabled,schedule_id, function(error){
            console.log(error);
            err = true;

        });
        if(enabled && !err){
            db.log('Schedule enabled id '+schedule_id);
            scheduler.enableSchedule(schedule_id);
        }
        else if(!enabled && !err){
            db.log('Schedule disabled id '+schedule_id);
            schduler.disableSchedule(schedule_id);
        }
        res.json(err);
    });

    //Show rules from specific schedule
    app.get('/rules', function(req, res) {
        var id = req.param('id');
        db.getDb().all('select * from rules where rules.schedules_id = ?', id, function(err, rows) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                res.end();
                return;
            }
            res.send(rows);
        });
    });

    // Add rule to specific schedule
    app.post('/rules', function(req, res) {
        var err = false;
        var schedules_id = req.param('schedules_id');
        var devices_id = req.param('devices_id');
        var cron = req.param('cron');
        var onoff = req.param('onoff');

        if (schedules_id === null || devices_id === null || cron === null) {
            res.statusCode = 400;
            return res.send('Error 400: Post syntax incorrect.');
        }
        db.getDb().run('insert into rules (devices_id, cron, schedules_id, onoff) values (?,?,?,?)', devices_id, cron, schedules_id, onoff, function(error) {
            console.log(error);
            err = true;
        });

        if(!err){
            db.getDb().all('select max(id) from rules', function(error, rows) {
                if (error) {
                    console.log(error);
                    res.status('500').send('db error');
                    err = true;
                }
                if(!err) {
                scheduler.ruleAdded(rows[0]['max(id)']);
                }           
            });
        }
        
        res.json(err);
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
        db.getDb().run('update rules set devices_id = ?, cron = ?, schedules_id = ?, onoff = ? where id = ?', devices_id, cron, schedules_id, onoff, id, function(error) {
            console.log(error);
            err = true;
        });
        if (!err) {
            scheduler.ruleUpdated(id);
        }
        res.json(err);
    });

    //Delete rules from schedules
    app.post('/rules/delete', function(req, res){
        var err = false;
        var rule_id = req.param('rule_id');

        if(rule_id === null){
            res.statusCode = 400;
            return res.send('Error 400: update syntax incorrect.');
        }
        db.getDb().run('delete from rules where rules.rule_id = ?', rule_id, function(error){
            console.log(error);
            err = true;
        });

        if(!err){
            scheduler.terminateRule(rule_id);
        }
        res.json(err);
    });

    //show all schedules and all rules
    app.get('/schedules/rules', function(req, res) {
        db.getDb().all('select *, rules.id as rules_id,devices.name from schedules inner join rules on schedules.id = rules.schedules_id inner join devices on devices.id = rules.devices_id', function(err, rows) {
            if (err) {
                console.log(err);
                res.status('500').send('db error');
                res.end();
                return;
            }
            res.send(rows);
        });
    });
};