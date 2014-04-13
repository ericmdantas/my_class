"use strict";

//classes

(function(mongoose)
{
    var dailyInformation = mongoose.Schema
    ({
        day: {type: String, trim: true, required: true, index: true},
        monthYear: {type: String, trim: true, required: true, index: true},
        teacherName: {type: String, trim: true, required: true},
        subject: {type: String, trim: true, required: true},
        studentByDay: [{
                            name: {type: String, trim: true},
                            wasInClass: {type: Boolean, required: true}
                      }]
    })

    var clazzSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true, index: true},
        students: [{type: String, trim: true, required: true}],
        time: {type: String, required: true},
        registered: {type: Date, default: new Date},
        lastModified: Date,
        usersAllowed: [],
        dailyInfo: [dailyInformation]
    });

    clazzSchema.methods.findAllClassesByUser = function(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0, dailyInfo: 0};

        Clazz.find(query, projection)
             .exec(function(err, clazzes)
                   {
                       if (err)
                           return done(err, null);

                        done(null, clazzes);
                   })
    }

    clazzSchema.methods.getClassesDailyInfo = function(user, monthYear, done)
    {
        var query = {usersAllowed: {$in: [user]}, "dailyInfo.monthYear": monthYear};
        var projection = {};

        //TODO CHECK THE REASON WHY IT'S ALSO BRINGIN OTHER MONTHS

        Clazz.find(query, projection)
             .exec(function(err, found)
                   {
                        if (err)
                            return done(err, null);

                        return done(null, found);
                   })
    }

    clazzSchema.methods.registerClassMomentInTime = function(user, moment, done)
    {
        var query = {usersAllowed: {$in: [user]}, name: moment.clazzName};
        var updt = {$addToSet: {dailyInfo: moment.dailyInfo}};

        Clazz.update(query, updt)
             .exec(function(err, found)
                  {
                      if (err)
                          return done(err);

                      return done(null);
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