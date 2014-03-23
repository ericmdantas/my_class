"use strict";

var assert = require('assert');
var BookController = require('../../../controllers/BookController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        describe('checks if BookController was created', function()
        {
            assert.strictEqual(typeof BookController, "object");
        })
    })
})