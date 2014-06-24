"use strict";

var expect = require('chai').expect;
var content = require('../../../routes/content');

describe('content sender being tested', function()
{
    describe('checks elements creation', function()
    {
        it('content should be created', function()
        {
            expect(content).to.be.defined;
            expect(content).to.be.an('object');
        })

        it('content.loginPage should be created', function()
        {
            expect(content.loginPage).to.be.defined;
            expect(content.loginPage).to.be.a('function');
        })

        it('content.mainPage should be created', function()
        {
            expect(content.mainPage).to.be.defined;
            expect(content.mainPage).to.be.a('function');
        })
    })
})