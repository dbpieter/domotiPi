/*

	Author: Hans Ott <hansott@hotmail.be>
	Date: 26/05/2014

	Projecten 1
	-----------
	- Pebble app: makes use of simply.js library

 */

/*
	Da Global vars
	--------------
 */

var appTitle = 'PiControl';
var status = false;
var apiUrl = 'http://192.168.0.164:8080'; // apiUrl - change ip address! :-)
var pins = new Array(); // pin status
var index = 0;
var min = 0;
var max = 15;

// set body text app;
var setScreen = function(msg) {
	simply.setText({
	  title: appTitle,
	  body: msg,
	}, true);
}

// set intial pin;
var setInitialPin = function() {
	for (var i = 0; i < pins.length; i++) {
		if (pins[i].pin == index) {
			setScreen('Pin ' + index + ': ' + pins[i].enabled);
		}
	};
}

// send ajax request to turn pin on/off;
var setPin = function(pin, enabled) {
	if (enabled) {
		ajax({ url: apiUrl + '/pins/' + pin + '/off', type: 'json' }, function(data) {
			setScreen('Pin ' + pin + ': off');
			refresh();
		});
	}
	else {
		ajax({ url: apiUrl + 'http://10.129.17.17:8080/pins/' + pin + '/on', type: 'json' }, function(data) {
			setScreen('Pin ' + pin + ': on');
			refresh();
		});
	}
}

// index++;
var indexUp = function() {
	index++;
	if (index > max) {
		index = min;
	}
}

// index--;
var indexDown = function() {
	index--;
	if (index < min) {
		index = max;
	}
}

// toggle index pin;
var execute = function() {
	for (var i = 0; i < pins.length; i++) {
		if (pins[i].pin == index) {
			setPin(index, pins[i].enabled);
		}
	};
}

// add event handlers for buttons;
var addEventHandlers = function() {
	simply.on('singleClick', function(e) {
		switch(e.button) {
			case 'up':
				indexUp();
				break;
			case 'down':
				indexDown();
				break;
			case 'select':
				execute();
				break;
		}
	});
}

// refresh pin status data
var refresh = function() {
	ajax({ url: apiUrl + '/pins/', type: 'json' }, function(data) {
		pins = data;
	});
}

// Init pebble app
setScreen('Loading...');

// Get initial values and prepare app
ajax({ url: apiUrl + '/pins/', type: 'json' }, function(data) {
	pins = data;
	setInitialPin();
});

// Add event handlers for buttons
addEventHandlers();

// Should work... I guess.
