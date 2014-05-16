// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com

var CronJob = require('cron').CronJob;
var db = require('./db.js');
var fs = require('fs');
var icc = require('./icconnection.js');

var jobs = new Array();

//seconds start with */5 !!!
var tempjob = new CronJob('10 * * * * *', function() {
    fs.readFile('/sys/bus/w1/devices/10-000802aafc40/w1_slave', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var temp = (data.split('\n')[1].split(' ')[9].split('=')[1]) / 1000;
        db.logTemp(temp);
        //console.log('temp logged');
    });
}, function() {
    console.log('Temperature logging stopped !');
}, true);

function loadSchedules(scheduleID) {
    db.getDb().all('select * from rules inner join schedules on schedules.id = rules.schedules_id inner join devices on devices.id = rules.devices_id where schedules.enabled = \'true\' ;', function(err, rows) {
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i]);
            newJob(rows[i]);
        }
    });
}

function newJob(row) {
    if (row['enabled'] !== 'true') { //schedule is not enabled, ignore
        return;
    }
    var job = new CronJob(row['cron'], function() {
        if (row['onoff'] === 'true') { //the job enables something
            icc.setPin(row['pin'], 1);
        }
        else {                         //the job disables something
            icc.setPin(row['pin'], 0);
        }
    }, function() {
        console.log('job ' + row['id'] + 'terminated');
    }, true);
    jobs.push({'job': job, 'info': row});
    job.start();
    console.log('jobs');
}

loadSchedules();

/*
 *  terminates one job
 */
function terminateJob(jobId) {
    for (var i = 0; i < jobs.length; i++) {
        if (jobs['info']['id'] === jobId) {
            jobs['job'].stop();
            jobs.splice(i, 1);
        }
    }
}

/*
 * terminates all jobs in a schedule
 */
function terminateSchedule(scheduleId) {
    for (var i = 0; i < jobs.length; i++) {
        if (jobs['info']['schedule_id'] === scheduleId) {
            jobs['job'].stop();
            jobs.splice(i,1);
        }
    }
}

/*
 * checks if all the jobs in the current schedule still exist and if new ones have been created
 * changes are made to the running jobs array (new jobs started and deleted ones terminated)
 */
function refreshSchedule() {
    jobs = new Array();
    loadSchedules();
}

/*
 * gets called when a rule is added to a schedule
 */
function ruleAdded(ruleId) {
	console.log(ruleId);
    db.getDb().all('select * from rules inner join schedules on schedules.id = rules.schedules_id inner join devices on devices.id = rules.devices_id where schedules.enabled = \'true\' and rules.id = ?;',ruleId, function(err, rows) {
			console.log(rows[0]);		
            console.log(rows);
            newJob(rows[0]);
        });
}


function newSchedule(scheduleID) {

}

function ruleUpdated(scheduleID, ruleID) {

}

function isScheduleRunning(scheduleID) {
    for (var i = 0; i < jobs.length; i++) {
        if (jobs[i]['info']['schedules_id'] === scheduleID) {
            return true;
        }
    }
    return false;
}

module.exports.terminateSchedule = terminateSchedule
module.exports.ruleAdded = ruleAdded;
module.exports.ruleUpdated = ruleUpdated;