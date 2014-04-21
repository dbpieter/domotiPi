// copyright Pieter De Bruyne 2014 - dbpieter@gmail.com
var i2c = require('i2c');

/*
 * Global vars
 */
var ADDRESS = 0x20; //device address
var IODIRA = 0x00; //GPA pin direction
var IODIRB = 0x01; //GPB pin direction
var OLATA = 0x14; //GPA output reg
var OLATB = 0x15; //GPB output reg

function ICConnection() {
    var currentOLATA = 0x0;
    var currentOLATB = 0x0;

    var pinMap = new Array();

    for (var i = 0; i < 8; i++) {
        pinMap[i] = [i, 'A', OLATA, 'GPA' + i.toString()]; //pinNumber,bank,register,pinname
    }

    for (var i = 8; i < 16; i++) {
        pinMap[i] = [i - 8, 'B', OLATB, 'GPB' + (i - 8).toString()]; //pinNumber,bank,register,pinname
    }

    var wire = new i2c(ADDRESS, {device: '/dev/i2c-1', debug: false});

    /*
     * reg is either 'A' or 'B'
     */
    this.setCurrentOLAT = function(reg, value) {
        if (reg === 'A') {
            currentOLATA = value;
        }
        else if (reg === 'B') {
            currentOLATB = value;
        }
        else {
            console.log('ERROR: invalid register')
        }
    };

    this.getCurrentOLAT = function(reg) {
        if (reg === 'A') {
            return currentOLATA;
        }
        else if (reg === 'B') {
            return currentOLATB;
        }
        else {
            console.log('ERROR: invalid register')
        }
    };

    this.getWire = function() {
        return wire;
    };

    this.getPinMap = function() {
        return pinMap;
    };

    //all pins as output
    this.sendToIC(IODIRA, [0x0]);
    this.sendToIC(IODIRB, [0x0]);

    //all pins off
    this.sendToIC(OLATA, [0x0]);
    this.sendToIC(OLATB, [0x0]);

}

ICConnection.prototype.sendToIC = function(register, values) {
    this.getWire().writeBytes(register, values, function(err) {
        if (err !== null) {
            console.log(err);
        }
    });
};

ICConnection.prototype.setPin = function(pinNumber, value) {
    if (pinNumber < 0 || pinNumber > 16) {
        console.log('ERROR: invalid pin number at setPin()');
        return;
    }

    var pinMap = this.getPinMap();
    var pinIndex = pinMap[pinNumber][0];
    var pinRegister = pinMap[pinNumber][1]; //A or B

    var pinHexMask, setHex, lat;
    pinHexMask = Math.pow(2, pinIndex);

    if (value === 0) {
        if ((this.getCurrentOLAT(pinRegister) & pinHexMask) === pinHexMask) {
            setHex = this.getCurrentOLAT(pinRegister) ^ pinHexMask;
            this.setCurrentOLAT(pinRegister, setHex);
            this.sendToIC(pinMap[pinNumber][2], [setHex]);
        }
    }
    if (value === 1) {
        if ((this.getCurrentOLAT(pinRegister) & pinHexMask) !== pinHexMask) {
            setHex = this.getCurrentOLAT(pinRegister) ^ pinHexMask;
            this.setCurrentOLAT(pinRegister, setHex);
            this.sendToIC(pinMap[pinNumber][2], [setHex]);
        }
    }
};

ICConnection.prototype.allOff = function(){
    this.sendToIC(OLATA,[0x0]);
    this.sendToIC(OLATB,[0x0]);
    this.setCurrentOLAT('A',0x0);
    this.setCurrentOLAT('B',0x0);
};

ICConnection.prototype.allOn = function(){
    this.sendToIC(OLATA,[0xFF]);
    this.sendToIC(OLATB,[0xFF]);
    this.setCurrentOLAT('A',0xFF);
    this.setCurrentOLAT('B',0xFF);
}

ICConnection.prototype.getPin = function(pinNumber) {
    if (pinNumber < 0 || pinNumber > 16) {
        console.log('ERROR: invalid pin number at getPin()');
        return;
    }

    var pinMap = this.getPinMap();
    var pinIndex = pinMap[pinNumber][0];
    var pinRegister = pinMap[pinNumber][1]; //A or B

    var pinHexMask = Math.pow(2, pinIndex);

    if ((this.getCurrentOLAT(pinRegister) & pinHexMask) === pinHexMask) {
        return 1;
    } else {
        return 0;
    }
};

ICConnection.prototype.isPinValid = function(pinNumber) {
    if (pinNumber < 0 || pinNumber > 15) {
        return false;
    }
    return true;
};

ICConnection.prototype.getStatus = function() {
    var status = new Array();
    for (var i = 0; i < 16; i++) {
        status[i] = {'pin':i,'enabled': this.getPin(i)};
    }
    return status;
};

var iccon = new ICConnection();

module.exports = iccon;