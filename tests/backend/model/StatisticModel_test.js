"use strict";

var assert = require('assert');
var StatisticModel = require('../../../models/Statistic');
var mongoose = require('mongoose');
var dburl = require('../helpers/db.json');
var DBCreator = require('../helpers/DBCreator');

describe('StatisticModel', function()
{
    before(function()
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    beforeEach(function(done)
    {
        new DBCreator().create('statistic', done);
    })

    describe('check elements creation', function()
    {
        it('checks if StatisticModel was created', function()
        {
            assert.strictEqual(typeof StatisticModel, "object");
        })

        it('checks if StatisticModel.findAllEarningsByTrimester was created', function()
        {
            assert.strictEqual(typeof StatisticModel.findAllEarningsByTrimester, "function");
        })

        it('checks if StatisticModel.findAllInterestedStudentsPerMonth was created', function()
        {
            assert.strictEqual(typeof StatisticModel.findAllInterestedStudentsPerMonth, "function");
        })
    })

    describe('findAllEarningsByTrimester', function()
    {
        it('shouldn\'t return anything - wrong user param', function(done)
        {
            var _wrongParams = ["", null, undefined, true, false, 1, 0, function(){}, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                StatisticModel.findAllEarningsByTrimester(_wrongParams[i], function(err, earnings)
                                                                           {
                                                                                assert.notStrictEqual(err, null);
                                                                                assert.strictEqual(err instanceof Error, true);
                                                                                assert.strictEqual(earnings, null);
                                                                           })
            }

            done();
        })

        it('should return earnings correctly', function(done)
        {
            var _user = "eric3";

            StatisticModel.findAllEarningsByTrimester(_user, function(err, earnings)
                                                             {
                                                                 assert.strictEqual(err, null);
                                                                 assert.strictEqual(typeof earnings, "object");
                                                                 assert.strictEqual(earnings.valorPrimeiroTrimestre, 0);
                                                                 assert.strictEqual(earnings.valorSegundoTrimestre, 1122334455);
                                                                 assert.strictEqual(earnings.valorTerceiroTrimestre, 0);
                                                                 assert.strictEqual(earnings.valorQuartoTrimestre, 123);
                                                                 done();
                                                             })
        })
    })

    describe('findAllInterestedStudentsPerMonth', function()
    {
        it('shouldn\'t return anything - wrong user param', function(done)
        {
            var _wrongParams = ["", null, undefined, true, false, 1, 0, function(){}, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                StatisticModel.findAllInterestedStudentsPerMonth(_wrongParams[i], function(err, interest)
                                                                                  {
                                                                                        assert.notStrictEqual(err, null);
                                                                                        assert.strictEqual(err instanceof Error, true);
                                                                                        assert.strictEqual(interest, null);
                                                                                  })
            }

            done();
        })

        it('should return interests correctly', function(done)
        {
            var _user = "eric3";

            StatisticModel.findAllInterestedStudentsPerMonth(_user, function(err, interest)
                                                                    {
                                                                        assert.strictEqual(err, null);
                                                                        assert.strictEqual(typeof interest, "object");
                                                                        done();
                                                                    })
        })
    })
})