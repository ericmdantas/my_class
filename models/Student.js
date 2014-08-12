"use strict";

(function(mongoose, lib, studentSchema)
{
    studentSchema.methods.findAllStudentsByUser = function(user, done)
    {
        if (lib.isStringInvalid(user))
            return done(new Error('Não é possível buscar todos os alunos sem que o usuário seja informado.'), null);

        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0, payments: 0};

        Student.find(query, projection)
               .sort('name')
               .exec(function(err, students)
                    {
                        if (err)
                            return done(err, null);

                        return done(null, students);
                    })
    }

    studentSchema.methods.findAllStudentsNames = function(user, done)
    {
        if (lib.isStringInvalid(user))
            return done(new Error('Não é possível buscar os nomes de todos os alunos sem que o usuário seja informado.'), null);

        var query = {usersAllowed: {$in: [user]}};
        var projection = {name: 1};

        Student.find(query, projection)
            .sort('name')
            .exec(function(err, students)
            {
                if (err)
                    return done(err, null);

                return done(null, students);
            })
    }

    studentSchema.methods.findAllStudentsNamesByClass = function(user, turma, done)
    {
        if (lib.isStringInvalid(user))
            return done(new Error('Não é possível buscar os nomes de alunos para esta determinada turma, pois o usuário não foi informado.'), null);

        if (lib.isStringInvalid(turma))
            return done(new Error('Não é possível buscar os nomes de alunos para esta determinada turma, pois a turma não foi informada.'), null);

        var query = {usersAllowed: {$in: [user]}, class: turma};
        var projection = {name: 1};

        Student.find(query, projection)
               .sort('name')
               .exec(function(err, students)
               {
                   if (err)
                       return done(err, null);

                   done(null, students)
               })
    }

    studentSchema.methods.findAllPaymentsByUser = function(user, done)
    {
        if (lib.isStringInvalid(user))
            return done(new Error('Não é possível buscar os pagamentos dos alunos, pois o usuário não foi informado.'), null);

        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0};

        Student.find(query, projection)
            .sort('name')
            .exec(function(err, doc)
            {
                if (err)
                    return done(err, null);

                return done(null, doc);
            })
    }

    studentSchema.methods.registerNewPayment = function(usuario, pagamento, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não é possível realizar pagamento sem que o usuário tenha sido informado"));

        if (lib.isObjectInvalid(pagamento))
            return done(new Error("Não é possível realizar pagamento sem que o pagamento tenha sido informado"));

        var query = {usersAllowed: {$in: [usuario]}, "name": pagamento.name};
        var updt = {$push: {"payments": pagamento}};

        Student.update(query, updt)
            .exec(function(err, updated)
            {
                if (err)
                    return done(err);

                return done(null);
            })
    }

    studentSchema.methods.registerStudent = function(usuario, aluno, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não é possível cadastrar aluno sem que o usuário tenha sido informado"));

        if (lib.isObjectInvalid(aluno))
            return done(new Error("Não é possível cadastrar aluno sem que o aluno tenha sido informado"));

        aluno.usersAllowed = [usuario];
        var student = new Student(aluno);

        student.save(function(err, saved)
                    {
                        if (err)
                            return done(err);

                        return done(null);
                    })
    }

    studentSchema.methods.editStudent = function(usuario, aluno, id, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não é possível editar aluno sem que o usuário tenha sido informado"));

        if (lib.isObjectInvalid(aluno))
            return done(new Error("Não é possível editar aluno sem que o aluno tenha sido informado"));

        if (lib.isStringInvalid(id))
            return done(new Error("Não é possível editar aluno sem que o ID tenha sido informado"));

        var query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete aluno._id;
        var updt = aluno;

        Student.findOneAndUpdate(query, updt)
               .exec(function(err, updated)
                     {
                         if (err)
                             return done(err);

                         return done(null);
                     })
    }

    studentSchema.methods.deleteStudent = function(user, id, done)
    {
        if (lib.isStringInvalid(user))
            return done(new Error("Não é possível deletar aluno sem que o usuário tenha sido informado"));

        if (lib.isStringInvalid(id))
            return done(new Error("Não é possível deletar aluno sem que o ID tenha sido informado"));

        var query = {usersAllowed: {$in: [user]}, _id: id};

        Student.findOneAndRemove(query)
               .exec(function(err, foundDoc)
                    {
                        if (err)
                            return done(err);

                        return done(null);
                    })
    }

    var Student = mongoose.model('Student', studentSchema);

    module.exports = Student;

}(require('mongoose'),
  require('../lib/lib'),
  require('../schemas/StudentSchema').studentSchema))