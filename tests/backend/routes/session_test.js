"use strict";

var session = require('../../../routes/session'),
    isLoggedIn = require('assert');

describe('Session being tested', function()
{
    describe('checks elements creation', function()
    {
        it('chcks if isLoggedIn was created', function()
        {
            isLoggedIn.strictEqual(typeof session, "function");
        })
    })
})