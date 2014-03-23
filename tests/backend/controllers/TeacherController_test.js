"use strict";

var assert = require('assert');
var TeacherController = require('../../../controllers/TeacherController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if TeacherController was created', function()
        {
            assert.strictEqual(typeof TeacherController, "object");
        })
    })
})