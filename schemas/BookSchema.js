"use strict";

(function(mongoose)
{
    var _bookSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true, index: true},
        quantity: {type: String, trim: true, required: true},
        registered: {type: Date, default: new Date},
        usersAllowed: []
    });

    exports.bookSchema = _bookSchema;

}(require('mongoose')))