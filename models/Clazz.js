"use strict";

//classes

(function(mongoose)
{
    var momentInTimeSchema = mongoose.Schema
    ({
        monthYear: {type: String, required: true},
        lastModified: {type: Date, required: true, default: new Date},
        observation: {type: String, trim: true},
        studentName: [{name: {type: String, trim: true}}],
        dailyInfo: [{
                        teacherName: {type: String, trim: true, required: true},
                        subject: {type: String, trim: true, required: true},
                        studentByDay: [{
                                            wasInClass: {type: Boolean},
                                            date: {type: Date}
                                      }]
                   }]
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
        var query = {usersAllowed: {$in: [user]}, name: moment.clazzName};
        var projection = {};

        Clazz.findOne(query, projection)
             .exec(function(err, found)
                  {
                      if (err)
                          return done(err)

                      if (found.momentTime.length === 0)
                          criaNovoMomentTime(found, moment, done);
                      else
                          preencheMomentExistente(found, moment, done);
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

    function criaNovoMomentTime(found, moment, done)
    {
        found.momentTime.push(moment);

        found.save(function(err, saved)
        {
            if (err)
                return done(err);

            return done(null)
        })
    }

    function preencheMomentExistente(found, moment, done)
    {
        for (var i = 0; i < found.momentTime.length; i++)
        {
            if (found.momentTime[i].monthYear === moment.monthYear)
            {
                for (var j = 0; j < found.momentTime[i].dailyInfo.length; j++)
                {
                    for (var h = 0; h < moment.dailyInfo.length; h++)
                    {
                        if (found.momentTime[i].dailyInfo[j].studentName === moment.dailyInfo[h].studentName)
                        {
                            found.momentTime[i].dailyInfo[j].studentByDay.push(moment.dailyInfo[h].date, moment.dailyInfo[h].wasInClass);

                            found.save(function(err, saved)
                            {
                                if (err)
                                    return done(err);

                                return done(null);
                            })
                        }
                    }
                }
            }
        }
    }

    var Clazz = mongoose.model('Clazz', clazzSchema);

    module.exports = Clazz;

}(require('mongoose')))