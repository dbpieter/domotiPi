var express = require('express');
var scheduler = require('./scheduler.js');
var app = express();

var passport = require('passport');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret


/*
 * needed for passport auth
 */
app.use(express.cookieParser());
app.use(express.bodyParser());

app.use(express.session({ secret: 'Azerty123' }));
app.use(passport.initialize());
app.use(passport.session());

//import routes
require('./routes.js')(app);


//start server
app.listen(8080);
console.log('Server listening op port 8080');
