"use strict";

var assert = require('assert'),
    StatisticModel = require('../../../models/stats');

describe('Testing StatisticModel', function()
{
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
})