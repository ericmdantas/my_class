"use strict";

var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User');

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
            var query = {username: username, password: password};
            var projection = {};

            User.findOne(query, projection)
                .exec(function(err, user)
                {
                    if (err || !user)
                        return done(err);

                    return done(null, user);
                });
       }));
}