"use strict";

(function(mongoose)
{
    var userSchema = mongoose.Schema
    ({
        username: {type: String, trim: true, required: true, index: {unique: true}},
        password: {type: String, trim: true, required: true},
        payment: {type: Boolean},
        registered: Date,
        lastModified: Date,
        type: String
    });

    userSchema.methods.countInfoByUsername = function(user, done)
    {
        var query = {username: user};
        var projection = {};

        User.findOne(query, projection)
            .exec(function(err, doc)
                  {
                     if (err)
                         return done(err, null);

                         done(null, doc);
                  })
    }

    var User = mongoose.model('User', userSchema);

    module.exports = User;

}(require('mongoose')))