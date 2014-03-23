"use strict";

var assert = require('assert');
var StatisticController = require('../../../controllers/StatisticController');

describe('StatisticController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if StatisticsController was created', function()
        {
            assert.strictEqual(typeof StatisticController, "object");
        })
    })
})