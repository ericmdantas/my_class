"use strict";

var assert = require('assert'),
    TeacherModel = require('../../../models/Teacher');

describe('Testing TeacherModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if TeacherModel was created', function()
        {
            assert.strictEqual(typeof TeacherModel, "function");
        })

        it('checks if TeacherModel.deleteTeacher was created', function()
        {
            var teacher = new TeacherModel();
            assert.strictEqual(typeof teacher.deleteTeacher, "function");
        })

        it('checks if TeacherModel.findAllTeachersByUser was created', function()
        {
            var teacher = new TeacherModel();
            assert.strictEqual(typeof teacher.findAllTeachersByUser, "function");
        })

        it('checks if TeacherModel.editTeacher was created', function()
        {
            var teacher = new TeacherModel();
            assert.strictEqual(typeof teacher.editTeacher, "function");
        })

        it('checks if TeacherModel.registerNewTeacher was created', function()
        {
            var teacher = new TeacherModel();
            assert.strictEqual(typeof teacher.registerNewTeacher, "function");
        })
    })
})