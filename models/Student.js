"use strict";

(function(mongoose, lib, Q, studentSchema)
{
    studentSchema.methods.findAllStudentsByUser = function(user)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error('Não é possível buscar todos os alunos sem que o usuário seja informado.'));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0, payments: 0};

        Student.find(query, projection)
               .sort('name')
               .exec(function(err, students)
                    {
                        err ? deferred.reject(err)
                            : deferred.resolve(students);
                    })

        return deferred.promise;
    }

    studentSchema.methods.findAllStudentsNames = function(user)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error('Não é possível buscar os nomes de todos os alunos sem que o usuário seja informado.'));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [user]}};
        var projection = {name: 1};

        Student
            .find(query, projection)
            .sort('name')
            .exec(function(err, students)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(students);
            })

        return deferred.promise;
    }

    studentSchema.methods.findAllStudentsNamesByClass = function(user, turma)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error('Não é possível buscar os nomes de alunos para esta determinada turma, pois o usuário não foi informado.'));
            return deferred.promise;
        }

        if (lib.isStringInvalid(turma))
        {
            deferred.reject(new Error('Não é possível buscar os nomes de alunos para esta determinada turma, pois a turma não foi informada.'));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [user]}, class: turma};
        var projection = {name: 1};

        Student
            .find(query, projection)
            .sort('name')
            .exec(function(err, students)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(students);
            })

        return deferred.promise;
    }

    studentSchema.methods.findAllPaymentsByUser = function(user)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error('Não é possível buscar os pagamentos dos alunos, pois o usuário não foi informado.'));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0};

        Student
            .find(query, projection)
            .sort('name')
            .exec(function(err, doc)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(doc);
            })

        return deferred.promise;
    }

    studentSchema.methods.registerNewPayment = function(usuario, pagamento)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não é possível realizar pagamento sem que o usuário tenha sido informado"));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(pagamento))
        {
            deferred.reject(new Error("Não é possível realizar pagamento sem que o pagamento tenha sido informado"));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}, "name": pagamento.name};
        var updt = {$push: {"payments": pagamento}};

        Student
            .update(query, updt)
            .exec(function(err, updated)
            {
                err ? deferred.reject(err)
                    : deferred.resolve();
            })

        return deferred.promise;
    }

    studentSchema.methods.registerStudent = function(usuario, aluno)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não é possível cadastrar aluno sem que o usuário tenha sido informado"));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(aluno))
        {
            deferred.reject(new Error("Não é possível cadastrar aluno sem que o aluno tenha sido informado"));
            return deferred.promise;
        }

        aluno.usersAllowed = [usuario];

        var student = new Student(aluno);

        student
            .save(function(err, saved)
                 {
                      err ? deferred.reject(err)
                          : deferred.resolve();
                 })

        return deferred.promise;
    }

    studentSchema.methods.editStudent = function(usuario, aluno, id)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não é possível editar aluno sem que o usuário tenha sido informado"));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(aluno))
        {
            deferred.reject(new Error("Não é possível editar aluno sem que o aluno tenha sido informado"));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("Não é possível editar aluno sem que o ID tenha sido informado"));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete aluno._id;
        var updt = aluno;

        Student
            .findOneAndUpdate(query, updt)
            .exec(function(err, updated)
                  {
                       err ? deferred.reject(err)
                           : deferred.resolve();
                  })

        return deferred.promise;
    }

    studentSchema.methods.deleteStudent = function(user, id)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Não é possível deletar aluno sem que o usuário tenha sido informado"));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("Não é possível deletar aluno sem que o ID tenha sido informado"));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [user]}, _id: id};

        Student
            .findOneAndRemove(query)
            .exec(function(err, deleted)
                 {
                     err ? deferred.reject(err)
                         : deferred.resolve();
                 })

        return deferred.promise;
    }

    var Student = mongoose.model('Student', studentSchema);

    module.exports = Student;

}(require('mongoose'),
  require('../lib/lib'),
  require('q'),
  require('../schemas/StudentSchema').studentSchema))