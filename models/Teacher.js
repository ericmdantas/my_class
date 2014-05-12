"use strict";

//teachers

(function(mongoose, lib)
{
    var teacherSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true, index: true},
        birthDate: {type: String, trim: true, required: true},
        admission: {type: String, trim: true},
        availability: {type: String, trim: true},
        email: {type: String, trim: true},
        mobilePhone: {type: String, trim: true},
        phone: {type: String, trim: true},
        salary: {type: String, trim: true, required: true},
        address: {type: String, trim: true, required: true},
        registered: {type: Date, default: new Date},
        lastModified: Date,
        usersAllowed: []
    });

    teacherSchema.methods.findAllTeachersByUser = function(usuario, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não foi informado o usuário com acesso aos professores."), null);

        var query = {usersAllowed: {$in: [usuario]}};
        var projection = {usersAllowed: 0};

        Teacher.find(query, projection)
               .sort('name')
               .exec(function(err, teachers)
               {
                   if (err)
                       return done(err, null);

                   return done(null, teachers);
               })
    }

    teacherSchema.methods.findAllTeachersNames = function(usuario, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não foi informado o usuário com acesso aos nomes dos professores."), null);

        var query = {usersAllowed: {$in: [usuario]}};
        var projection = {name: 1};

        Teacher.find(query, projection)
               .exec(function(err, teachers)
                    {
                        if (err)
                            return done(err, null);

                        return done(null, teachers);
                    })
    }

    teacherSchema.methods.registerNewTeacher = function(usuario, professor, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não foi informado o usuário no momento do cadastro dos professores."));

        if (lib.isObjectInvalid(professor))
            return done(new Error("Não foi informado o professor a ser cadastrado."));

        professor.usersAllowed = [usuario];
        var teacher = new Teacher(professor);

        teacher.save(function(err, saved)
                    {
                        if (err)
                            return done(err);

                        done();
                    })
    }

    teacherSchema.methods.editTeacher = function(usuario, professor, id, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não foi informado o usuário no momento da edição do professor."));

        if (lib.isObjectInvalid(professor))
            return done(new Error("Não foi informado o professor a ser editado."));

        if (lib.isStringInvalid(id))
            return done(new Error("Não foi informado o id para edição do professor."));

        var query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete professor._id;
        var updt = professor;

        Teacher.findOneAndUpdate(query, updt)
               .exec(function(err, updated)
                    {
                        if (err)
                            return done(err);

                        done(null);
                    })
    }

    teacherSchema.methods.deleteTeacher = function(usuario, id, done)
    {
        if (lib.isStringInvalid(usuario))
            return done(new Error("Não foi informado o usuário no momento da deleção do professor."));

        if (lib.isStringInvalid(id))
            return done(new Error("Não foi informado o id para deleção do professor."));

        var query = {usersAllowed: {$in: [usuario]}, _id: id};

        Teacher.findOneAndRemove(query)
               .exec(function(err, deleted)
               {
                   if (err)
                       return done(err);

                   done(null);
               })
    }

    var Teacher = mongoose.model('Teacher', teacherSchema);

    module.exports = Teacher;

}(require('mongoose'),
  require('../lib/lib')))