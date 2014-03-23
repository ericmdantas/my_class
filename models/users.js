"use strict";

var mongoose = require('mongoose');

(function(db, classSchema, teacherSchema, studentSchema, bookSchema)
{
    var userSchema = mongoose.Schema
    ({
        username: {type: String, trim: true, required: true, index: {unique: true}},
        password: {type: String, trim: true, required: true},
        payment: {type: Boolean},
        registered: Date,
        lastModified: Date,
        type: String,
        classes: [classSchema],
        teachers: [teacherSchema],
        students: [studentSchema],
        books: [bookSchema]
    });


    userSchema.methods.findAllUsers = function(user, pass, done)
    {
        var query = {username: user, password: pass};
        var projection = {classes: 0, books: 0, students: 0};
        db.findAll(query, projection, done);
    }

    userSchema.methods.findUserByUsername = function(user, done)
    {
        var query = {username: user};
        var projection = {};
        db.findAll(query, projection, done);
    }

    module.exports = mongoose.model('User', userSchema);

}(require('../lib/libDB'), require('./classes').classSchema, require('./teachers').teacherSchema, require('./students').studentSchema, require('./books').bookSchema))

