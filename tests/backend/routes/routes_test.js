"use strict";

var expect = require('chai').expect;
var routes = require('../../../routes/routes');

describe('routes.js being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if routes.js was created', function()
        {
            expect(routes).to.be.defined;
            expect(routes).to.be.an('object');
        })

        it('checks if routes.js was created', function()
        {
            expect(routes.init).to.be.defined;
            expect(routes.init).to.be.a('function');
        })
    })
})