"use strict";

var assert = require('assert');
var mongoose = require('mongoose');
var UserModel = require('../../../models/User');
var dburl = require('../config/db.json');
var DBCreator = require('../helpers/DBCreator');

describe('UserModel', function()
{
    before(function()
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    beforeEach(function(done)
    {
        new DBCreator().create('user', done);
    })

    afterEach(function(done)
    {
        UserModel.remove(done);
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