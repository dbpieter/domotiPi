// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com
var fs  = require('fs');

fs.readFile('/sys/bus/w1/devices/10-000802aafc40/w1_slave', 'utf8', function(err,data){
	var temp = (data.split('\n')[1].split(' ')[9].split('=')[1])/1000;
	console.log(temp);
});



	

