"use strict";

//classes

(function(mongoose)
{
    var clazzSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true},
        studentsQuantity: {type: String, trim: true, required: true},
        time: {type: String, required: true},
        registered: {type: Date, default: new Date},
        lastModified: Date,
        usersAllowed: []
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

    clazzSchema.methods.editClass = function(usuario, turma, done)
    {
        var query = {usersAllowed: {$in: [usuario]}, _id: turma._id};
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