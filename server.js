"use strict";

require('newrelic');

var express      = require('express'),
    os           = require('os'),
    passport     = require('passport'),
    configure    = require('./config/configurator'),
    db           = require('./lib/libDB'),
    routes       = require('./routes/routes'),
    port         = process.env.PORT || 7777,
    app          = express();
    require('./config/passport')(passport);

configure.me(app, express, passport, __dirname);
db.init();
routes.init(app, passport);
app.listen(port);

console.log('up and running @ port: %s, host: %s & enviroment: ', port, os.hostname(), process.env.NODE_ENV);