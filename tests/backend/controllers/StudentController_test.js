"use strict";

var assert = require('assert');
var StudentController = require('../../../controllers/StudentController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if StudentController was created', function()
        {
            assert.strictEqual(typeof StudentController, "object");
        })
    })
})