"use strict";

var expect = require('chai').expect;
var libDB = require('../../../lib/libDB');

describe('db stuff', function()
{
	describe('checks if the libDB was created', function()
    {
        it('checks if libDB was created', function()
        {
            expect(libDB).to.be.defined;
            expect(libDB).to.be.an('object');
        })

        it('checks if libDB.init was created', function()
        {
            expect(libDB.init).to.be.defined;
            expect(libDB.init).to.be.a('function');
        })
    })
})