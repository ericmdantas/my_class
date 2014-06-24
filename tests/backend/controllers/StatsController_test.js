"use strict";

var expect = require('chai').expect;
var StatisticController = require('../../../controllers/StatisticController');

describe('StatisticController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if StatisticsController was created', function()
        {
            expect(StatisticController).to.be.defined;
            expect(StatisticController).to.be.an('object');
        })
    })
})