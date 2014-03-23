"use strict";

var content = require('../../../routes/content');
var assert = require('assert');

describe('content sender being tested', function()
{
    describe('checks elements creation', function()
    {
        it('content should be created', function()
        {
            assert.strictEqual(typeof content, 'object');
        })

        it('content.loginPage should be created', function()
        {
            assert.strictEqual(typeof content.loginPage, 'function');
        })

        it('content.mainPage should be created', function()
        {
            assert.strictEqual(typeof content.mainPage, 'function');
        })
    })
})