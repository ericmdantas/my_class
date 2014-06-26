"use strict";

var expect = require('chai').expect;
var mongoose = require('mongoose');
var UserModel = require('../../../models/User');
var dburl = require('../helpers/db.json');
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
              expect(UserModel).to.be.an("function");
        })
    })

    describe("check properties", function()
    {
        it('should return the right properties', function(done)
        {
            UserModel.findOne({username: "eric3"})
                     .exec(function(err, found)
                          {
                                expect(err).to.equal(null);
                                expect(found).to.be.an("object");
                                expect(found.username).to.equal("eric3");
                                expect(found.password).to.equal("112233");
                                expect(found.payment).to.be.true;
                                done();
                          })
        })
    })
})