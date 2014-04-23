"use strict";

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(passport)
{
    passport.serializeUser(function(user, done)
    {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done)
    {
        User.findById(id)
            .exec(function(err, user)
                  {
                      done(err, user._id);
                  })

    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done)
       {
            var _query = {username: username, password: password};
            var _projection = {};

            User.findOne(_query, _projection)
                .exec(function(err, user)
                {
                    if (err)
                        return done(err, null);

                    return done(null, user);
                });
       }));
}