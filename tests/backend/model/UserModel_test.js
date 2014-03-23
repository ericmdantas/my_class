"use strict";

var assert = require('assert'),
    UserModel = require('../../../models/users');

describe('Testing UserModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if UserModel was created', function()
        {
            assert.strictEqual(typeof UserModel, "function");
        })

        it('checks if findAllUsers was created', function()
        {
            var user = new UserModel();
            assert.strictEqual(typeof user.findAllUsers, "function");
        })

        it('checks if findUserByUsername was created', function()
        {
            var user = new UserModel();
            assert.strictEqual(typeof user.findUserByUsername, "function");
        })
    })
})