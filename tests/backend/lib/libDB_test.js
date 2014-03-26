"use strict";

var libDB = require('../../../lib/libDB');
var assert = require('assert');

describe('db stuff', function()
{
	describe('checks if the libDB was created', function()
    {
        it('checks if libDB was created', function()
        {
            assert.strictEqual(typeof libDB, "object");
        })

        it('checks if libDB.init was created', function()
        {
            assert.strictEqual(typeof libDB.init, "function");
        })
    })
})