"use strict";

//classes

(function(mongoose, lib, Q, clazzSchema)
{
    clazzSchema.methods.findAllClassesByUser = function(user)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para buscar as turmas."));
            return deferred.promise;
        }

        var _query = {usersAllowed: {$in: [user]}};
        var _projection = {usersAllowed: 0, dailyInfo: 0};

        Clazz.find(_query, _projection)
             .sort('name')
             .exec(function(err, clazzes)
                   {
                       err ? deferred.reject(err)
                           : deferred.resolve(clazzes);
                   })

        return deferred.promise;
    }

    clazzSchema.methods.findAllClassesNamesByUser = function(user)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para buscar os nomes das turmas."));
            return deferred.promise;
        }

        var _query = {usersAllowed: {$in: [user]}};
        var _projection = {name: 1};

        Clazz.find(_query, _projection)
            .sort('name')
            .exec(function(err, classes)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(classes);
            })

        return deferred.promise;
    }

    clazzSchema.methods.getClassesDailyInfo = function(user, monthYear)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para buscar as informações de todas as turma."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(monthYear))
        {
            deferred.reject(new Error("Não foi encontrado o mês e ano para buscar as informações de todas as turma."));
            return deferred.promise;
        }

        var _query = {usersAllowed: {$in: [user]}, "dailyInfo.monthYear": monthYear};
        var _projection = {usersAllowed: 0};

        Clazz.find(_query, _projection)
            .sort('name')
            .exec(function(err, found)
            {
                if (err)
                {
                    deferred.reject(err);
                    return;
                }

                var _isArray = true;

                if (found && found.length > 0)
                    _removeDifferentMonths(found, monthYear, _isArray);

                deferred.resolve(found);
            })

        return deferred.promise;
    }

    clazzSchema.methods.getClassesDailyInfoByClass = function(user, monthYear, id)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para buscar as informações da turma."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(monthYear))
        {
            deferred.reject(new Error("Não foi encontrado o mês e ano para buscar as informações da turma."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("Não foi encontrado o ID para buscar as informações da turma."));
            return deferred.promise;
        }

        var _query = {usersAllowed: {$in: [user]}, _id: id, "dailyInfo.monthYear": monthYear};
        var _projection = {usersAllowed: 0};

        Clazz.findOne(_query, _projection)
             .exec(function(err, found)
                  {
                      if (err)
                      {
                          deferred.reject(err);
                          return;
                      }

                      var _isArray = false;

                      if (!lib.isObjectInvalid(found))
                          _removeDifferentMonths(found, monthYear, _isArray);

                      deferred.resolve(found);
                  })

        return deferred.promise;
    }

    clazzSchema.methods.registerNewClass = function(usuario, turma)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para cadastrar a turma."));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(turma))
        {
            deferred.reject(new Error("Não foi encontrada a turma a ser cadastrada."));
            return deferred.promise;
        }

        turma.usersAllowed = [usuario];

        var _clazz = new Clazz(turma);

        _clazz.save(function(err, saved)
        {
            err ? deferred.reject(err)
                : deferred.resolve();
        })

        return deferred.promise;
    }

    clazzSchema.methods.registerClassMomentInTime = function(user, moment)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para cadastro da aula."));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(moment))
        {
            deferred.reject(new Error("Não foi encontrada a turma referente a aula para o cadastro."));
            return deferred.promise;
        }

        var _query = {usersAllowed: {$in: [user]}, name: moment.clazzName};
        var _updt = {$addToSet: {dailyInfo: moment.dailyInfo}};

        Clazz.update(_query, _updt)
             .exec(function(err, found)
                  {
                      err ? deferred.reject(err)
                          : deferred.resolve();
                  })

        return deferred.promise;
    }

    clazzSchema.methods.editClass = function(usuario, turma, id, done)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para a edição da turma."));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(turma))
        {
            deferred.reject(new Error("Não foi encontrada a turma referente a aula para a edição."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("Não foi encontrado o id para edição da turma."));
            return deferred.promise;
        }

        var _query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete turma._id;
        var _updt = turma;

        Clazz.findOneAndUpdate(_query, _updt)
             .exec(function(err, updated)
                   {
                       err ? deferred.reject(err)
                           : deferred.resolve();
                   })

        return deferred.promise;
    }

    clazzSchema.methods.deleteClass = function(user, id)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Não foi encontrado o usuário para a deleção da turma."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("Não foi encontrado o id para a deleção da turma."));
            return deferred.promise;
        }

        var _query = {usersAllowed: {$in: [user]}, _id: id};

        Clazz.findOneAndRemove(_query)
             .exec(function(err, deleted)
                  {
                      err ? deferred.reject(err)
                          : deferred.resolve();
                  })

        return deferred.promise;
    }

    function _removeDifferentMonths(found, monthYear, isArray)
    {
        if (isArray)
        {
            for (var i = 0; i < found.length; i++)
            {
                for (var j = 0; found[i].dailyInfo[j]; j++)
                {
                    if (monthYear !== found[i].dailyInfo[j].monthYear)
                    {
                        found[i].dailyInfo.splice(j, 1);
                        j -= 1;
                    }
                }
            }
        }
        else
        {
            for (var j = 0; found.dailyInfo[j]; j++)
            {
                if (monthYear !== found.dailyInfo[j].monthYear)
                {
                    found.dailyInfo.splice(j, 1);
                    j -= 1;
                }
            }
        }
    }

    var Clazz = mongoose.model('Clazz', clazzSchema);

    module.exports = Clazz;

}(require('mongoose'),
  require('../lib/lib'),
  require('q'),
  require('../schemas/ClazzSchema').clazzSchema))