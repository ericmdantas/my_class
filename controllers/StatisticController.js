"use strict";

var StatisticsModel = require('../models/Statistic');
var ErrorHandler = require('../lib/ErrorHandler');

function Statistics()
{
    function getEarningByTrimesterInfo(req, res)
    {
        var usuario = req.session.passport.user;

        var callback = function(error, doc)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta informações por trimestre'));
            }
            else
                res.json({resultado: doc});
        }

        StatisticsModel.findAllEarningsByTrimester(usuario, callback);
    }

    function getInterestedStudentsPerMonth(req, res)
    {
        var usuario = req.session.passport.user;

        var callback = function(error, doc)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta interesse por mês'));
            }
            else
                res.json({resultado: doc});
        }

        StatisticsModel.findAllInterestedStudentsPerMonth(usuario, callback);
    }

    return {
                getEarningByTrimesterInfo: getEarningByTrimesterInfo,
                getInterestedStudentsPerMonth: getInterestedStudentsPerMonth
           }
}

module.exports = new Statistics();