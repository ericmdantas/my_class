"use strict";

var expect = require('chai').expect;
var StudentController = require('../../../controllers/StudentController');

describe('UserController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if StudentController was created', function()
        {
            expect(StudentController).to.be.defined;
            expect(StudentController).to.be.an('object');
        })
    })
})