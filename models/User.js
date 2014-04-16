"use strict";

(function(mongoose)
{
    var userSchema = mongoose.Schema
    ({
        username: {type: String, trim: true, required: true, index: {unique: true}},
        password: {type: String, trim: true, required: true},
        payment: {type: Boolean},
        registered: {type: Date},
        lastModified: {type: Date},
        type: {type: String, trim: true}
    });

    var User = mongoose.model('User', userSchema);

    module.exports = User;

}(require('mongoose')))