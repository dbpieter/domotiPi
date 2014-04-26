// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com

var CronJob = require('cron').CronJob;
var db = require('./db.js');
var fs = require('fs');
var icc = require('./icconnection.js');

var jobs = new Array();

//seconds start with */5 !!!
var tempjob = new CronJob('* 5 * * * *', function() {
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

function loadSchedules() {
    db.getDb().all('select * from rules inner join schedules on schedules.id = rules.schedules_id inner join devices on devices.id = rules.devices_id;', function(err, rows) {
        for (var i = 0; i < rows.length ; i++) {
            newJob(rows[i]);
        }
        console.log(rows);
    });
}

function newJob(row) {
    if (row['enabled'] !== 'true') { //schedule is not enabled, ignore
        return;
    }
    var job = new CronJob(row['cron'], function() {
        if (row['onoff'] === 'true') { //the job enables something
            icc.togglePin(row['pin'])
        }
        else {                         //the job disables something
            icc.togglePin(row['pin'])
        }
    }, function() {
        console.log('job ' + row[id] + 'terminated');
    }, true);
    jobs.push(job);
    job.start();
}

loadSchedules();

function terminateJob(jobId){
    
}

/*
 * terminates the current schedule
 */
function terminateSchedule(){
    
}

/*
 * checks if all the jobs in the current schedule still exist and if new ones have been created
 * changes are made to the running jobs array (new jobs started and deleted ones terminated)
 */
function refreshSchedule(){
    
}








