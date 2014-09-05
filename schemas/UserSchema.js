"use strict";

(function(mongoose)
{
    var _userSchema = mongoose.Schema
    ({
        username: {type: String, trim: true, required: true, index: {unique: true}},
        password: {type: String, trim: true, required: true},
        payment: {type: Boolean},
        registered: {type: Date, default: new Date},
        lastModified: {type: Date},
        type: {type: String, trim: true}
    });

    exports.userSchema = _userSchema;

}(require('mongoose')))