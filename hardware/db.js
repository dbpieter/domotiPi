
var sqlite3 = require('sqlite3');
var fs = require('fs');
var db = new sqlite3.Database('../database/picontrol.db');

// js current date to sqlite3 compatible date YYYY-MM-DD HH:MM:SS
function currentDateTime() {
    var date = new Date();
    var dateString = (date.getFullYear().toString()) + '-' + (date.getMonth().toString()) + '-' + (date.getDate().toString());
    dateString += ' ' + (date.getHours().toString()) + ':' + (date.getMinutes().toString()) + ':' + (date.getSeconds().toString());
    return dateString;
}

//puts a certain temperature at the current time in the db
var logTemp = function(temp) {
    db.run('insert into temperatures (temperature,time) values (?,?)', temp, currentDateTime());
};

var getDb = function(){
    return db;
};

//test code
//fs.readFile('/sys/bus/w1/devices/10-000802aafc40/w1_slave', 'utf8', function(err, data) {
//    var temp = (data.split('\n')[1].split(' ')[9].split('=')[1]) / 1000;
//    logTemp(temp);
//});

//db.all('select * from temperatures', function(err, rows) {
//    console.log(err);
//    console.log(rows);
//});

module.exports.logTemp = logTemp;
module.exports.getDb = getDb;