"use strict";

var assert = require('assert');
var UserController = require('../../../controllers/UserController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        describe('checks if UserController was created', function()
        {
            assert.strictEqual(typeof UserController, "object");
        })
    })
})