"use strict";

var expect = require('chai').expect;
var session = require('../../../services/SessionService');

describe('Session being tested', function()
{
    describe('checks elements creation', function()
    {
        it('chcks if isLoggedIn was created', function()
        {
            expect(session).to.be.defined;
            expect(session).to.be.a('function');
        })
    })
})