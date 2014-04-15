"use strict";

var assert = require('assert');
var mongoose = require('mongoose');
var UserModel = require('../../../models/User');

describe('UserModel', function()
{
    before(function()
    {
        mongoose.connect('mongodb://localhost/myclass_test');
        mongoose.connection.on('error', function(){});
    })

    describe('check elements creation', function()
    {
        it('checks if UserModel was created', function()
        {
            assert.strictEqual(typeof UserModel, "function");
        })
    })

    describe('check properties', function()
    {
        beforeEach(function(done)
        {
            UserModel.create({username: "eric3", password: "112233", registered: new Date(), payment: true}, done);
        })

        afterEach(function(done)
        {
            UserModel.remove(done);
        })

        it('should return the right properties', function(done)
        {
            UserModel.find({username: "eric3"})
                     .exec(function(err, found)
                          {
                                assert.strictEqual(err, null);
                                assert.strictEqual(typeof found, "object");
                                assert.strictEqual(found.length, 1);
                                done();
                          })
        })
    })
})