"use strict";

//students

(function(mongoose, ObjectId)
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
               .exec(function(err, doc)
                    {
                        if (err || !done)
                            throw err;

                        done(doc);
                    })
    }

    studentSchema.methods.registerStudent = function(usuario, aluno, done)
    {
        aluno.usersAllowedd = [aluno];
        var student = new Student(aluno);

        student.save(function(err, updated)
                    {
                        if (err)
                            throw err;

                        done();
                    })
    }

    studentSchema.methods.editStudent = function(usuario, aluno, done)
    {
        var query = {username: usuario, 'students._id': aluno._id};
        var updt = {'students.$': aluno};

        Student.update(query, updt)
               .exec(function(err, updated)
                     {
                         if (err)
                             throw err;

                         done();
                     })
    }

    studentSchema.methods.deleteStudent = function(user, identificacaoAluno, done)
    {
        var query = {username: user, "students._id": ObjectId(identificacaoAluno)};
        var projection = {classes: 0, teachers: 0, books: 0, payments: 0};

        Student.findOne(query, projection)
               .exec(function(err, foundDoc)
                    {
                        if (err)
                            throw err;

                        for (var i = 0; i < foundDoc.students.length; i++)
                        {
                            if (id === foundDoc.students[i]._id.toString())
                            {
                                foundDoc.students.splice(i, 1);

                                foundDoc.save(function(err, saved)
                                {
                                    if (err)
                                        throw err;

                                    done();
                                })
                            }
                        }
                    })
    }

    studentSchema.methods.findAllPaymentsByUser = function(user, done)
    {
        var query = {username: user};
        var projection = {students: 1};

        Student.findOne(query, projection)
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

}(require('mongoose'), require('mongoose').Types.ObjectId))