"use strict";

var StatisticsModel = require('../models/stats');

function Statistics()
{
    function getEarningByTrimesterInfo(req, res)
    {
        var usuario = req.query.u;

        var callback = function(doc)
        {
            res.json({resultado: doc});
        }

        StatisticsModel.findAllEarningsByTrimester(usuario, callback);
    }

    function getInterestedStudentsPerMonth(req, res)
    {
        var usuario = req.query.u;

        var callback = function(doc)
        {
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