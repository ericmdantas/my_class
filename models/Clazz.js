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
             .exec(function(err, doc)
                   {
                       if (err || !done)
                           throw err;

                        done(doc);
                   })
    }

    clazzSchema.methods.registerNewClass = function(usuario, turma, done)
    {
        turma.usersAllowed = [usuario];
        var clazz = new Clazz(turma);

        clazz.save(function(err, saved)
        {
            if (err)
                throw err;

            done();
        })
    }

    clazzSchema.methods.editClass = function(usuario, turma, done)
    {
        var query = {username: usuario, 'classes._id': turma._id};
        var updt = {"classes.$": turma}

        Clazz.update(query, updt)
             .exec(function(err, updated)
                   {
                      if (err)
                          throw err;

                      done();
                   })
    }

    clazzSchema.methods.deleteClass = function(user, identificacaoTurma, done)
    {
        var query = {username: user, "classes._id": identificacaoTurma};
        var projection = {students: 0, teachers: 0, books: 0};
        Clazz.findOne(query, projection)
            .exec(function(err, foundDoc)
            {
                if (err)
                    throw err;

                for (var i = 0; i < foundDoc.classes.length; i++)
                {
                    if (id === foundDoc.classes[i]._id.toString())
                    {
                        foundDoc.classes.splice(i, 1);

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

    var Clazz = mongoose.model('Clazz', clazzSchema);

    module.exports = Clazz;

}(require('mongoose')))