"use strict";

var assert = require('assert'),
    ClassModel = require('../../../models/Clazz');

describe('Testing ClassModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if ClassModel was created', function()
        {
            assert.equal(typeof ClassModel, "function");
        })

        it('checks if ClassModel.deleteClass was created', function()
        {
            var clazz = new ClassModel();
            assert.equal(typeof clazz.deleteClass, "function");
        })

        it('checks if ClassModel.editClass was created', function()
        {
            var clazz = new ClassModel();
            assert.equal(typeof clazz.editClass, "function");
        })

        it('checks if ClassModel.findAllClassesByUser was created', function()
        {
            var clazz = new ClassModel();
            assert.equal(typeof clazz.findAllClassesByUser, "function");
        })

        it('checks if ClassModel.registerNewClass was created', function()
        {
            var clazz = new ClassModel();
            assert.equal(typeof clazz.registerNewClass, "function");
        })
    })
})