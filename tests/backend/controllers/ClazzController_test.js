"use strict";

var assert = require('assert');
var ClazzController = require('../../../controllers/ClazzController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checkks if ClassController was created', function()
        {
            assert.strictEqual(typeof ClazzController, "object");
        })
    })
})