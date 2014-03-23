"use strict";

//teachers

(function(mongoose, db)
{
    var teacherSchema = mongoose.Schema({
        name: {type: String, trim: true, required: true, index: true},
        birthDate: {type: String, trim: true, required: true},
        admission: {type: String, trim: true},
        availability: {type: String, trim: true},
        email: {type: String, trim: true},
        mobilePhone: {type: String, trim: true},
        phone: {type: String, trim: true},
        salary: {type: String, trim: true, required: true},
        address: {type: String, trim: true, required: true},
        registered: Date,
        lastModified: Date
    });


    function findAllTeachersByUser(user, done)
    {
        var query = {username: user};
        var projection = {teachers: 1};
        db.findAll(query, projection, done);
    }

    function registerNewTeacher(usuario, professor, done)
    {
        professor['registered'] = new Date();
        var query = {username: usuario};
        var updt = {$push: {teachers: professor}};
        db.registerNew(query, updt, done);
    }

    function editTeacher(usuario, professor, done)
    {
        var query = {username: usuario, 'teachers._id': professor._id};
        var updt = {'teachers.$': professor};
        db.editInfo(query, updt, done);
    }

    function deleteTeacher(user, identificacaoProfessor, done)
    {
        var query = {username: user, "teachers._id": identificacaoProfessor};
        var projection = {students: 0, classes: 0, books: 0};
        db.delete(query, projection, identificacaoProfessor, 'teachers', done);
    }

    exports.teacherSchema = teacherSchema;

    exports.findAllTeachersByUser = findAllTeachersByUser;
    exports.registerNewTeacher = registerNewTeacher;
    exports.editTeacher = editTeacher;
    exports.deleteTeacher = deleteTeacher;

}(require('mongoose'), require('../lib/libDB')))