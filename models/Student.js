"use strict";

//students

(function(mongoose)
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
        usersAllowed: [],
        payments: [paymentsSchema]
    });

    studentSchema.methods.findAllStudentsByUser = function(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0};

        Student.find(query, projection)
               .exec(function(err, students)
                    {
                        if (err || !done)
                            throw err;

                        done(students);
                    })
    }

    studentSchema.methods.registerStudent = function(usuario, aluno, done)
    {
        aluno.usersAllowed = [usuario];
        var student = new Student(aluno);

        student.save(function(err, saved)
                    {
                        if (err)
                            throw err;

                        done();
                    })
    }

    studentSchema.methods.editStudent = function(usuario, aluno, done)
    {
        var query = {usersAllowed: {$in: [usuario]}, _id: aluno._id};
        delete aluno._id;
        var updt = aluno;

        Student.findOneAndUpdate(query, updt)
               .exec(function(err, updated)
                     {
                         if (err)
                             throw err;

                         done();
                     })
    }

    studentSchema.methods.deleteStudent = function(user, identificacaoAluno, done)
    {
        var query = {usersAllowed: {$in: [user]}, _id: identificacaoAluno};

        Student.findOneAndRemove(query)
               .exec(function(err, foundDoc)
                    {
                        if (err)
                            throw err;

                        done();
                    })
    }

    studentSchema.methods.findAllPaymentsByUser = function(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {};

        Student.find(query, projection)
               .exec(function(err, doc)
                    {
                        if (err || !done)
                            throw err;

                        done(doc);
                    })
    }

    studentSchema.methods.registerNewPayment = function(usuario, pagamento, done)
    {
        var query = {username: usuario, "students.name": pagamento.name};
        var updt = {$push: {"students.$.payments": pagamento}};

        Student.update(query, updt)
               .exec(function(err, updated)
                    {
                        if (err)
                            throw err;

                        done();
                    })
    }

    var Student = mongoose.model('Student', studentSchema);

    module.exports = Student;

}(require('mongoose')))