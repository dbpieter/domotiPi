// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com

//TODO: handle cron jobs

//on start: load all schedules from db

var CronJob = require('cron').CronJob;
var dbModule = require('./db.js');
var fs = require('fs');
var icc = require('./icconnection.js');

var jobs = new Array();

//seconds start with */5 !!!
var tempjob = new CronJob('30 * * * * *', function() {
    fs.readFile('/sys/bus/w1/devices/10-000802aafc40/w1_slave', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var temp = (data.split('\n')[1].split(' ')[9].split('=')[1]) / 1000;
        dbModule.logTemp(temp);
        //console.log('temp logged');
    });
}, function() {
    console.log('Temperature logging stopped !');
}, true);

function loadSchedules(){
    db.getDb().all('select * from rules inner join schedules on rules.schedules_id = schedules.id where schedules.enabled = true;', function(err,rows){

    });
}

function newJob(row){
    var job = new CronJob(row['cron'],function(){
        if(row['onoff'] === 'true'){ //
            
        }
        else{

        }
    }, function(){
        console.log(row['rules_id'] + 'stopped');
    },true);
    jobs.push(job);
    job.start();
}






