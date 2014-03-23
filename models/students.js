"use strict";

//students

(function(mongoose, ObjectId, db)
{
    var paymentsSchema = mongoose.Schema({
        paymentMonth: {type: String, required: true},
        amountPaid: {type: String, required: true},
        paidWithWhat: {type: String, required: true},
        untilWhen: {type: String},
        registered: {type: Date, required: true, default: new Date},
        lastModified: {type: Date},
        observation: {type: String, trim: true}
    });

    var studentSchema = mongoose.Schema({
        name: {type: String, trim: true, required: true, index: true},
        birthDate: {type: String, trim: true, required: true},
        email: {type: String, trim: true, index: true},
        phone: {type: String, trim: true},
        class: {type: String},
        mobilePhone: {type: String, trim: true},
        availability: {type: String, trim: true},
        contract: {type: String, trim: true},
        contractDate: {type: String, trim: true},
        address: {type: String, trim: true},
        status: {type: String, trim: true},
        lastModified: Date,
        registered: {type: Date, default: new Date},
        payments: [paymentsSchema]
    });


    function deleteStudent(user, identificacaoAluno, done)
    {
        var query = {username: user, "students._id": ObjectId(identificacaoAluno)};
        var projection = {classes: 0, teachers: 0, books: 0, payments: 0};
        db.delete(query, projection, identificacaoAluno, 'students', done);
    }

    function editStudent(usuario, aluno, done)
    {
        var query = {username: usuario, 'students._id': aluno._id};
        var updt = {'students.$': aluno};
        db.editInfo(query, updt, done);
    }

    function registerNewStudent(usuario, aluno, done)
    {
        var query = {username: usuario};
        var updt = {$push: {students: aluno}};
        db.registerNew(query, updt, done);
    }

    function findAllStudentsByUser(user, done)
    {
        var query = {username: user};
        var projection = {students: 1, "classes.name": 1};
        db.findAll(query, projection, done);
    }

    function findAllPaymentsByUser(user, done)
    {
        var query = {username: user};
        var projection = {students: 1};
        db.findAll(query, projection, done);
    }

    function registerNewPayment(usuario, pagamento, done)
    {
        var query = {username: usuario, "students.name": pagamento.name};
        var updt = {$push: {"students.$.payments": pagamento}};
        db.registerNew(query, updt, done);
    }

    exports.studentSchema = studentSchema;

    exports.findAllStudentsByUser = findAllStudentsByUser;
    exports.registerNewStudent = registerNewStudent;
    exports.editStudent = editStudent;
    exports.deleteStudent = deleteStudent;
    exports.findAllPaymentsByUser = findAllPaymentsByUser;
    exports.registerNewPayment = registerNewPayment;

}(require('mongoose'), require('mongoose').Types.ObjectId, require('../lib/libDB')))