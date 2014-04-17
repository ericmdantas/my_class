"use strict";

var assert = require('assert');
var mongoose = require('mongoose');
var UserModel = require('../../../models/User');
var dburl = require('../config/db.json');

describe('UserModel', function()
{
    before(function()
    {
        mongoose.connect(dburl);
        mongoose.connection.on('error', function(){});
    })

    describe('check elements creation', function()
    {
        it('checks if UserModel was created', function()
        {
            assert.strictEqual(typeof UserModel, "function");
        })
    })

    describe("check properties", function()
    {
        beforeEach(function(done)
        {
            UserModel.create({username: "eric3    ", password: "112233   ", registered: new Date(), payment: true}, done);
        })

        afterEach(function(done)
        {
            UserModel.remove(done);
        })

        it('should return the right properties', function(done)
        {
            UserModel.findOne({username: "eric3"})
                     .exec(function(err, found)
                          {
                                assert.strictEqual(err, null);
                                assert.strictEqual(typeof found, "object");
                                assert.strictEqual(found.username, "eric3");
                                assert.strictEqual(found.password, "112233");
                                assert.strictEqual(found.payment, true);
                                done();
                          })
        })
    })
})