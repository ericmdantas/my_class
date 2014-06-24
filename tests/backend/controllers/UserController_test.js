"use strict";

var expect = require('chai').expect;
var UserController = require('../../../controllers/UserController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        describe('checks if UserController was created', function()
        {
            expect(UserController).to.be.defined;
            expect(UserController).to.be.an('object');
        })
    })
})