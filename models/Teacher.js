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
               .exec(function(err, doc)
               {
                   if (err || !done)
                       throw err;

                   done(doc);
               })
    }

    teacherSchema.methods.registerNewTeacher = function(usuario, professor, done)
    {
        professor.usersAllowed = [usuario];
        var teacher = new Teacher(professor);

        teacher.save(function(err, saved)
                    {
                        if (err)
                            throw err;

                        done();
                    })
    }

    teacherSchema.methods.editTeacher = function(usuario, professor, done)
    {
        var query = {username: usuario, 'teachers._id': professor._id};
        var updt = {'teachers.$': professor};

        Teacher.update(query, updt)
               .exec(function(err, updated)
               {
                   if (err)
                       throw err;

                   done();
               })
    }

    teacherSchema.methods.deleteTeacher = function(user, identificacaoProfessor, done)
    {
        var query = {username: user, "teachers._id": identificacaoProfessor};
        var projection = {students: 0, classes: 0, books: 0};

        Teacher.findOne(query, projection)
               .exec(function(err, foundDoc)
               {
                   if (err)
                       throw err;

                   for (var i = 0; i < foundDoc.teachers.length; i++)
                   {
                       if (id === foundDoc.teachers[i]._id.toString())
                       {
                           foundDoc.teachers.splice(i, 1);

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

    var Teacher = mongoose.model('Teacher', teacherSchema);

    module.exports = Teacher;

}(require('mongoose')))