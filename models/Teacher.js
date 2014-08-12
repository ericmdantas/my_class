"use strict";

(function(mongoose, lib, Q, teacherSchema)
{
    teacherSchema.methods.findAllTeachersByUser = function(usuario)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não foi informado o usuário com acesso aos professores."));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}};
        var projection = {usersAllowed: 0};

        Teacher
            .find(query, projection)
            .sort('name')
            .exec(function(err, teachers)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(teachers);
            })

        return deferred.promise;
    }

    teacherSchema.methods.findAllTeachersNames = function(usuario, done)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não foi informado o usuário com acesso aos nomes dos professores."));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}};
        var projection = {name: 1};

        Teacher
            .find(query, projection)
            .exec(function(err, teachers)
                  {
                     err ? deferred.reject(err)
                         : deferred.resolve(teachers);
                  })

        return deferred.promise;
    }

    teacherSchema.methods.registerNewTeacher = function(usuario, professor)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não foi informado o usuário no momento do cadastro dos professores."));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(professor))
        {
            deferred.reject(new Error("Não foi informado o professor a ser cadastrado."));
            return deferred.promise;
        }

        professor.usersAllowed = [usuario];
        var teacher = new Teacher(professor);

        teacher
            .save(function(err, saved)
                  {
                      err ? deferred.reject(err)
                          : deferred.resolve();
                  });

        return deferred.promise;
    }

    teacherSchema.methods.editTeacher = function(usuario, professor, id)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não foi informado o usuário no momento da edição do professor."));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(professor))
        {
            deferred.reject(new Error("Não foi informado o professor a ser editado."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("Não foi informado o id para edição do professor."));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete professor._id;
        var updt = professor;

        Teacher
            .findOneAndUpdate(query, updt)
            .exec(function(err, updated)
                 {
                     err ? deferred.reject(err)
                         : deferred.resolve();
                 })

        return deferred.promise;
    }

    teacherSchema.methods.deleteTeacher = function(usuario, id)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não foi informado o usuário no momento da deleção do professor."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("Não foi informado o id para deleção do professor."));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}, _id: id};

        Teacher
            .findOneAndRemove(query)
            .exec(function(err, deleted)
                 {
                     err ? deferred.reject(err)
                         : deferred.resolve();
                 })

        return deferred.promise;
    }

    var Teacher = mongoose.model('Teacher', teacherSchema);

    module.exports = Teacher;

}(require('mongoose'),
  require('../lib/lib'),
  require('q'),
  require('../schemas/TeacherSchema').teacherSchema))