"use strict";

var assert = require('assert'),
    ClassModel = require('../../../models/classes');

describe('Testing ClassModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if ClassModel was created', function()
        {
            assert.equal(typeof ClassModel, "object");
        })

        it('checks if ClassModel.classSchema was created', function()
        {
            assert.equal(typeof ClassModel.classSchema, "object");
        })

        it('checks if ClassModel.deleteClass was created', function()
        {
            assert.equal(typeof ClassModel.deleteClass, "function");
        })

        it('checks if ClassModel.editClass was created', function()
        {
            assert.equal(typeof ClassModel.editClass, "function");
        })

        it('checks if ClassModel.findAllClassesByUser was created', function()
        {
            assert.equal(typeof ClassModel.findAllClassesByUser, "function");
        })

        it('checks if ClassModel.registerNewClass was created', function()
        {
            assert.equal(typeof ClassModel.registerNewClass, "function");
        })
    })
})