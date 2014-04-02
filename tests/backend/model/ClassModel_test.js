"use strict";

var assert = require('assert'),
    ClassModel = require('../../../models/Clazz');

describe('Testing ClassModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if ClassModel was created', function()
        {
            assert.strictEqual(typeof ClassModel, "function");
        })

        it('checks if ClassModel.deleteClass was created', function()
        {
            var clazz = new ClassModel();
            assert.strictEqual(typeof clazz.deleteClass, "function");
        })

        it('checks if ClassModel.editClass was created', function()
        {
            var clazz = new ClassModel();
            assert.strictEqual(typeof clazz.editClass, "function");
        })

        it('checks if ClassModel.findAllClassesByUser was created', function()
        {
            var clazz = new ClassModel();
            assert.strictEqual(typeof clazz.findAllClassesByUser, "function");
        })

        it('checks if ClassModel.registerNewClass was created', function()
        {
            var clazz = new ClassModel();
            assert.strictEqual(typeof clazz.registerNewClass, "function");
        })

        it('checks if ClassModel.registerMomentInTime was created', function()
        {
            var clazz = new ClassModel();
            assert.strictEqual(typeof clazz.registerClassMomentInTime, 'function');
        })
    })
})