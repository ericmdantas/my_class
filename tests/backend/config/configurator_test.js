"use strict";

var expect = require('chai').expect;
var configurator = require('../../../config/configurator');

describe('Configurator being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if configurator was created', function()
        {
            expect(configurator).to.be.defined;
            expect(configurator).to.be.a('object');
        })

        it('checks if me was created', function()
        {
            expect(configurator.me).to.be.defined;
            expect(configurator.me).to.be.a('function');
        })

        //TODO: CREATE MORE TESTS
    })
})