"use strict";

//stats

(function(User, lib)
{
    function findAllEarningsByTrimester(user, done)
    {
        User.aggregate({$match: {username: user}},
            {$unwind: "$students"},
            {$unwind: "$students.payments"},
            {$group: {
                _id: {
                    mes_de_pagamento: "$students.payments.paymentMonth",
                    valor: "$students.payments.amountPaid"
                }
            }
            },
            {$project: {_id: 0, mes: "$_id.mes_de_pagamento", valor: "$_id.valor"}},
            function(err, doc)
            {
                var trimestres;

                if (err)
                    throw err;

                trimestres = lib.getValuesByTrimester(doc);

                done(trimestres);
            })
    }

    function findAllInterestedStudentsPerMonth(user, done)
    {
        User.findOne({username: user}, {"students.lastModified": 1})
            .exec(function(err, doc)
            {
                if (err)
                    throw err;

                var meses = lib.getMonthInDate(doc);

                done(meses);
            })
    }

    exports.findAllEarningsByTrimester = findAllEarningsByTrimester;
    exports.findAllInterestedStudentsPerMonth = findAllInterestedStudentsPerMonth;

}(require('../lib/libDB').User, require('../lib/lib')))