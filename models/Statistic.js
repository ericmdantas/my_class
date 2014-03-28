"use strict";

//stats

(function(Student, lib)
{
    function findAllEarningsByTrimester(user, done)
    {
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

                              var trimestres;
                              trimestres = lib.getValuesByTrimester(doc);

                              done(null, trimestres);
                          })
    }

    function findAllInterestedStudentsPerMonth(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {registered: 1};

        Student.find(query, projection)
               .exec(function(err, doc)
               {
                   if (err)
                       return done(err, null);

                   var meses = lib.getMonthInDate(doc);

                   done(null, meses);
                })
    }

    exports.findAllEarningsByTrimester = findAllEarningsByTrimester;
    exports.findAllInterestedStudentsPerMonth = findAllInterestedStudentsPerMonth;

}(require('../models/Student'), require('../lib/lib')))