"use strict";

//teachers

(function(mongoose)
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
        registered: {type: Date, default: new Date},
        lastModified: Date,
        usersAllowed: []
    });

    teacherSchema.methods.findAllTeachersByUser = function(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0};

        Teacher.find(query, projection)
               .exec(function(err, teachers)
               {
                   if (err)
                       return done(err, null);

                   done(null, teachers);
               })
    }

    teacherSchema.methods.registerNewTeacher = function(usuario, professor, done)
    {
        professor.usersAllowed = [usuario];
        var teacher = new Teacher(professor);

        teacher.save(function(err, saved)
                    {
                        if (err)
                            return done(err);

                        done();
                    })
    }

    teacherSchema.methods.editTeacher = function(usuario, professor, done)
    {
        var query = {usersAllowed: {$in: [usuario]}, _id: professor._id};
        delete professor._id;
        var updt = professor;

        Teacher.findOneAndUpdate(query, updt)
               .exec(function(err, updated)
                    {
                        if (err)
                            return done(err);

                        done();
                    })
    }

    teacherSchema.methods.deleteTeacher = function(user, identificacaoProfessor, done)
    {
        var query = {usersAllowed: {$in: [user]}, _id: identificacaoProfessor};

        Teacher.findOneAndRemove(query)
               .exec(function(err, deleted)
               {
                   if (err)
                       return done(err);

                   done();
               })
    }

    var Teacher = mongoose.model('Teacher', teacherSchema);

    module.exports = Teacher;

}(require('mongoose')))