"use strict";

var expect = require('chai').expect;
var ClazzController = require('../../../controllers/ClazzController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checkks if ClassController was created', function()
        {
            expect(ClazzController).to.be.defined;
            expect(ClazzController).to.be.an('object');
        })
    })
})