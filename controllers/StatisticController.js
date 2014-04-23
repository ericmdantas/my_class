"use strict";

var StatisticsModel = require('../models/Statistic');
var ErrorHandler = require('../lib/ErrorHandler');

function Statistics()
{
    function _getEarningByTrimesterInfo(req, res)
    {
        var _usuario = req.session.passport.user;

        var callback = function(error, doc)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta informações por trimestre'));
            }
            else
                res.json({resultado: doc});
        }

        StatisticsModel.findAllEarningsByTrimester(_usuario, callback);
    }

    function _getInterestedStudentsPerMonth(req, res)
    {
        var _usuario = req.session.passport.user;

        var callback = function(error, doc)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta interesse por mês'));
            }
            else
                res.json({resultado: doc});
        }

        StatisticsModel.findAllInterestedStudentsPerMonth(_usuario, callback);
    }

    return {
                getEarningByTrimesterInfo: _getEarningByTrimesterInfo,
                getInterestedStudentsPerMonth: _getInterestedStudentsPerMonth
           }
}

module.exports = new Statistics();