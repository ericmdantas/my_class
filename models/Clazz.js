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
        if ((!user) || ("string" !== typeof user) || (user.length === 0))
            return done(new Error("Não foi encontrado o usuário para buscar as turmas."), null);

        var _query = {usersAllowed: {$in: [user]}};
        var _projection = {usersAllowed: 0, dailyInfo: 0};

        Clazz.find(_query, _projection)
             .exec(function(err, clazzes)
                   {
                       if (err)
                           return done(err, null);

                        done(null, clazzes);
                   })
    }

    clazzSchema.methods.findAllClassesNamesByUser = function(user, done)
    {
        if ((!user) || ("string" !== typeof user) || (user.length === 0))
            return done(new Error("Não foi encontrado o usuário para buscar os nomes das turmas."), null);

        var _query = {usersAllowed: {$in: [user]}};
        var _projection = {name: 1};

        Clazz.find(_query, _projection)
            .exec(function(err, classes)
            {
                if (err)
                    return done(err, null);

                done(null, classes);
            })
    }

    clazzSchema.methods.getClassesDailyInfo = function(user, monthYear, done)
    {
        //TODO FIX, SO IT ONLY RETURNS THE MATCHING MONTH/YEAR

        if ((!user) || ("string" !== typeof user) || (user.length === 0))
            return done(new Error("Não foi encontrado o usuário para buscar as informações de todas as turma."), null);

        if ((!monthYear) || ("string" !== typeof monthYear) || (monthYear.length === 0))
            return done(new Error("Não foi encontrado o mês e ano para buscar as informações de todas as turma."), null);

        var _query = {usersAllowed: {$in: [user]}, "dailyInfo.monthYear": monthYear};
        var _projection = {};

        Clazz.find(_query, _projection)
            .exec(function(err, found)
            {
                if (err)
                    return done(err, null);

                return done(null, found);
            })
    }

    clazzSchema.methods.getClassesDailyInfoByClass = function(user, monthYear, clazzId, done)
    {
        if ((!user) || ("string" !== typeof user) || (user.length === 0))
            return done(new Error("Não foi encontrado o usuário para buscar as informações da turma."), null);

        if ((!monthYear) || ("string" !== typeof monthYear) || (monthYear.length === 0))
            return done(new Error("Não foi encontrado o mês e ano para buscar as informações da turma."), null);

        if ((!clazzId) || ("string" !== typeof clazzId) || (clazzId.length === 0))
            return done(new Error("Não foi encontrado o ID para buscar as informações da turma."), null);

        //TODO FIX, SO IT ONLY RETURNS THE MATCHING MONTH/YEAR

        var _query = {usersAllowed: {$in: [user]}, _id: clazzId, "dailyInfo.monthYear": monthYear};
        var _projection = {};

        Clazz.findOne(_query, _projection)
             .exec(function(err, found)
                  {
                      console.log(found);

                      if (err)
                          return done(err, null);

                      return done(null, found);
                  })
    }

    clazzSchema.methods.registerNewClass = function(usuario, turma, done)
    {
        if ((!usuario) || ("string" !== typeof usuario))
            return done(new Error("Não foi encontrado o usuário para cadastrar a turma."));

        if ((!turma) || ("object" !== typeof turma) || (!Object.keys(turma).length))
            return done(new Error("Não foi encontrada a turma a ser cadastrada."));

        turma.usersAllowed = [usuario];
        var _clazz = new Clazz(turma);

        _clazz.save(function(err, saved)
        {
            if (err)
                return done(err);

            return done(null);
        })
    }

    clazzSchema.methods.registerClassMomentInTime = function(user, moment, done)
    {
        if ((!user) || ("string" !== typeof user))
            return done(new Error("Não foi encontrado o usuário para cadastro da aula."));

        if ((!moment) || ("object" !== typeof moment) || (!Object.keys(moment).length))
            return done(new Error("Não foi encontrada a turma referente a aula para o cadastro."));

        var _query = {usersAllowed: {$in: [user]}, name: moment.clazzName};
        var _updt = {$addToSet: {dailyInfo: moment.dailyInfo}};

        Clazz.update(_query, _updt)
             .exec(function(err, found)
                  {
                      if (err)
                          return done(err);

                      return done(null);
                  })
    }

    clazzSchema.methods.editClass = function(usuario, turma, id, done)
    {
        if ((!usuario) || ("string" !== typeof usuario))
            return done(new Error("Não foi encontrado o usuário para a edição da turma."));

        if ((!turma) || ("object" !== typeof turma) || (!Object.keys(turma).length))
            return done(new Error("Não foi encontrada a turma referente a aula para a edição."));

        if ((!id) || ("string" !== typeof id))
            return done(new Error("Não foi encontrado o id para edição da turma."));

        var _query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete turma._id;
        var _updt = turma;

        Clazz.findOneAndUpdate(_query, _updt)
             .exec(function(err, updated)
                   {
                      if (err)
                          return done(err);

                      done(null);
                   })
    }

    clazzSchema.methods.deleteClass = function(user, id, done)
    {
        if ((!user) || ("string" !== typeof user))
            return done(new Error("Não foi encontrado o usuário para a deleção da turma."));

        if ((!id) || ("string" !== typeof id))
            return done(new Error("Não foi encontrado o id para a deleção da turma."));

        var _query = {usersAllowed: {$in: [user]}, _id: id};

        Clazz.findOneAndRemove(_query)
             .exec(function(err, deleted)
                  {
                     if (err)
                         return done(err);

                     done(null);
                  })
    }

    var Clazz = mongoose.model('Clazz', clazzSchema);

    module.exports = Clazz;

}(require('mongoose')))