"use strict";

var assert = require('assert'),
    TeacherModel = require('../../../models/teachers');

describe('Testing TeacherModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if TeacherModel was created', function()
        {
            assert.strictEqual(typeof TeacherModel, "object");
        })

        it('checks if TeacherModel.teacherSchema was created', function()
        {
            assert.strictEqual(typeof TeacherModel.teacherSchema, "object");
        })

        it('checks if TeacherModel.deleteTeacher was created', function()
        {
            assert.strictEqual(typeof TeacherModel.deleteTeacher, "function");
        })

        it('checks if TeacherModel.findAllTeachersByUser was created', function()
        {
            assert.strictEqual(typeof TeacherModel.findAllTeachersByUser, "function");
        })

        it('checks if TeacherModel.editTeacher was created', function()
        {
            assert.strictEqual(typeof TeacherModel.editTeacher, "function");
        })

        it('checks if TeacherModel.registerNewTeacher was created', function()
        {
            assert.strictEqual(typeof TeacherModel.registerNewTeacher, "function");
        })
    })
})