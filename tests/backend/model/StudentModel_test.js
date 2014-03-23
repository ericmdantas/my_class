"use strict";

var assert = require('assert'),
    StudentModel = require('../../../models/students');

describe('Testing ClassModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if ClassModel was created', function()
        {
            assert.strictEqual(typeof StudentModel, "object");
        })
    })
})