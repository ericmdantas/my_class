"use strict";

if ('production' === process.env.NODE_ENV)
    require('newrelic');

var express      = require('express');
var os           = require('os');
var passport     = require('passport');
var configure    = require('./config/configurator');
var db           = require('./lib/libDB');
var routes       = require('./routes/routes');
var port         = process.env.PORT || 7777;
var app          = express();
require('./config/passport')(passport);

configure.me(__dirname, app, express, passport);
db.init();
routes.init(express.Router(), app, passport);
app.listen(port);

console.log('up and running @ port: %s, host: %s & enviroment: ', port, os.hostname(), process.env.NODE_ENV);