var express = require('express');
var scheduler = require('./scheduler.js');

var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

require('./routes.js')(app);

app.listen(8080);
console.log('Server listening op port 8080');
