"use strict";

var expect = require('chai').expect;
var passport = require('../../../config/configurator');

describe('Configurator being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if configurator was created', function()
        {
            expect(passport).to.be.defined;
            expect(passport).to.be.a('object');
        })

        //TODO: CREATE MORE TESTS
    })
})