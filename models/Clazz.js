"use strict";

//classes

(function(mongoose)
{
    var momentInTimeSchema = mongoose.Schema
    ({
        teacher: {type: String, trim: true, required: true},
        date: {type: Date, required: true},
        lastModified: {type: Date, required: true, default: new Date},
        studentsInTheClass: [{name: String, presence: [{isInClass: Boolean}]}],
        subject: {type: String, trim: true, required: true},
        observation: {type: String, trim: true}
    })

    var clazzSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true},
        studentsQuantity: {type: String, trim: true, required: true},
        time: {type: String, required: true},
        registered: {type: Date, default: new Date},
        lastModified: Date,
        usersAllowed: [],
        momentTime: [momentInTimeSchema]
    });

    clazzSchema.methods.findAllClassesByUser = function(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0};

        Clazz.find(query, projection)
             .exec(function(err, clazzes)
                   {
                       if (err)
                           return done(err, null);

                        done(null, clazzes);
                   })
    }

    clazzSchema.methods.registerClassMomentInTime = function(user, moment, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var updt = {$push: {momentTime: moment}};

        Clazz.update(query, updt)
             .exec(function(err, updated)
                  {
                      if (err)
                         return done(err)

                      done(null);
                  })
    }

    clazzSchema.methods.findAllClassesNamesByUser = function(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {name: 1};

        Clazz.find(query, projection)
             .exec(function(err, classes)
                  {
                        if (err)
                            return done(err, null);

                        done(null, classes);
                  })
    }

    clazzSchema.methods.registerNewClass = function(usuario, turma, done)
    {
        turma.usersAllowed = [usuario];
        var clazz = new Clazz(turma);

        clazz.save(function(err, saved)
        {
            if (err)
                return done(err);

            done(null);
        })
    }

    clazzSchema.methods.editClass = function(usuario, turma, id, done)
    {
        var query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete turma._id;
        var updt = turma;

        Clazz.findOneAndUpdate(query, updt)
             .exec(function(err, updated)
                   {
                      if (err)
                          return done(err);

                      done();
                   })
    }

    clazzSchema.methods.deleteClass = function(user, identificacaoTurma, done)
    {
        var query = {usersAllowed: {$in: [user]}, _id: identificacaoTurma};

        Clazz.findOneAndRemove(query)
             .exec(function(err, deleted)
                  {
                     if (err)
                         return done(err);

                     done();
                  })
    }

    var Clazz = mongoose.model('Clazz', clazzSchema);

    module.exports = Clazz;

}(require('mongoose')))