"use strict";

var assert = require('assert'),
    passport = require('../../../config/configurator');

describe('Configurator being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if configurator was created', function()
        {
            assert.strictEqual(typeof passport, "object");
        })
    })
})