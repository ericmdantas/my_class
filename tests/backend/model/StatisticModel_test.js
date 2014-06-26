"use strict";

var expect = require('chai').expect;
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
            expect(StatisticModel).to.be.an("object");
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
                                                                                expect(err).to.not.equal(null);
                                                                                expect(err).to.be.an.instanceof(Error);
                                                                                expect(earnings).to.equal(null);
                                                                           })
            }

            done();
        })

        it('should return earnings correctly', function(done)
        {
            var _user = "eric3";

            StatisticModel.findAllEarningsByTrimester(_user, function(err, earnings)
                                                             {
                                                                 expect(err).to.equal(null);
                                                                 expect(typeof earnings).to.equal("object");
                                                                 expect(earnings.valorPrimeiroTrimestre).to.equal(0);
                                                                 expect(earnings.valorSegundoTrimestre).to.equal(1122334455);
                                                                 expect(earnings.valorTerceiroTrimestre).to.equal(0);
                                                                 expect(earnings.valorQuartoTrimestre).to.equal(123);
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
                                                                                        expect(err).to.not.equal(null);
                                                                                        expect(err).to.be.an.instanceof(Error);
                                                                                        expect(interest).to.equal(null);
                                                                                  })
            }

            done();
        })

        it('should return interests correctly', function(done)
        {
            var _user = "eric3";

            StatisticModel.findAllInterestedStudentsPerMonth(_user, function(err, interest)
                                                                    {
                                                                        expect(err).to.equal(null);
                                                                        expect(typeof interest).to.equal("object");
                                                                        done();
                                                                    })
        })
    })
})