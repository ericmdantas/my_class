"use strict";

//classes

(function(mongoose, db, Clazz)
{
    var classSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true},
        studentsQuantity: {type: String, trim: true, required: true},
        time: {type: String, required: true},
        registered: Date,
        lastModified: Date
    });

    function findAllClassesByUser(user, done)
    {
        var query = {username: user};
        var projection = {classes: 1};
        db.findAll(query, projection, done);
    }

    function registerNewClass(usuario, turma, done)
    {
        turma['registered'] = new Date();
        var query = {username: usuario};
        var updt = {$push: {classes: turma}};
        db.registerNew(query, updt, done);
    }

    function editClass(usuario, turma, done)
    {
        var query = {username: usuario, 'classes._id': turma._id};
        var updt = {"classes.$": turma}
        db.editInfo(query, updt, done);
    }

    function deleteClass(user, identificacaoTurma, done)
    {
        var query = {username: user, "classes._id": identificacaoTurma};
        var projection = {students: 0, teachers: 0, books: 0};
        db.delete(query, projection, identificacaoTurma, 'classes', done);
    }

    exports.classSchema = classSchema;

    exports.findAllClassesByUser = findAllClassesByUser;
    exports.registerNewClass = registerNewClass;
    exports.editClass = editClass;
    exports.deleteClass = deleteClass;

}(require('mongoose'), require('../lib/libDB'), require('../controllers/ClassController')))