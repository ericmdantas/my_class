"use strict";

//stats

(function(Student, lib)
{
    function findAllEarningsByTrimester(user, done)
    {
        if ((!user) || ("string" !== typeof user) || (user.length === 0))
            return done(new Error("Não foi possível calcular o ganho por trimestre, pois o usuário não foi informado."), null);

        var _trimestres;

        Student.aggregate({$match: {usersAllowed: {$in: [user]}}},
                          {$unwind: "$payments"},
                          {$group: {
                              _id: {
                                  mes_de_pagamento: "$payments.paymentMonth",
                                  valor: "$payments.amountPaid"
                              }
                          }
                          },
                          {$project: {_id: 0, mes: "$_id.mes_de_pagamento", valor: "$_id.valor"}},
                          function(err, doc)
                          {
                              if (err)
                                 return done(err, null);

                              _trimestres = lib.getValuesByTrimester(doc);

                              return done(null, _trimestres);
                          })
    }

    function findAllInterestedStudentsPerMonth(user, done)
    {
        if ((!user) || ("string" !== typeof user) || (user.length === 0))
            return done(new Error("Não foi possível verificar o interesse por mês, pois o usuário não foi informado."), null);

        var _meses;
        var _query = {usersAllowed: {$in: [user]}};
        var _projection = {registered: 1};

        Student.find(_query, _projection)
               .exec(function(err, doc)
               {
                   if (err)
                       return done(err, null);

                   _meses = lib.getMonthInDate(doc);

                   done(null, _meses);
                })
    }

    exports.findAllEarningsByTrimester = findAllEarningsByTrimester;
    exports.findAllInterestedStudentsPerMonth = findAllInterestedStudentsPerMonth;

}(require('../models/Student'), require('../lib/lib')))