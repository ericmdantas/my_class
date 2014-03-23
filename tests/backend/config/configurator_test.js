"use strict";

var assert = require('assert'),
    configurator = require('../../../config/configurator');

describe('Configurator being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if configurator was created', function()
        {
            assert.strictEqual(typeof configurator, "object");
        })

        it('checks if me was created', function()
        {
            assert.strictEqual(typeof configurator.me, "function");
        })
    })
})