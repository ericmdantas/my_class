"use strict";

var assert = require('assert');
var ClassController = require('../../../controllers/ClassController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checkks if ClassController was created', function()
        {
            assert.strictEqual(typeof ClassController, "object");
        })
    })
})