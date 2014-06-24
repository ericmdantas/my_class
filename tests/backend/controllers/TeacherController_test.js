"use strict";

var expect = require('chai').expect;
var TeacherController = require('../../../controllers/TeacherController');

describe('TeacherController being tested', function()
{
    describe('checks elements creation', function()
    {
        it('checks if TeacherController was created', function()
        {
            expect(TeacherController).to.be.defined;
            expect(TeacherController).to.be.an('object');
        })
    })
})