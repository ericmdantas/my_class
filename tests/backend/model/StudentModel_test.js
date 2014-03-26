"use strict";

var assert = require('assert'),
    StudentModel = require('../../../models/Student');

describe('Testing StudentsModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if StudentsModel was created', function()
        {
            assert.strictEqual(typeof StudentModel, "function");
        })

        it('checks if StudentsModel findAllStudents was created', function()
        {
            var student = new StudentModel();
            assert.strictEqual(typeof student.findAllStudentsByUser, "function");
        })

        it('checks if StudentsModel registerStudent was created', function()
        {
            var student = new StudentModel();
            assert.strictEqual(typeof student.registerStudent, "function");
        })

        it('checks if StudentsModel editStudent was created', function()
        {
            var student = new StudentModel();
            assert.strictEqual(typeof student.editStudent, "function");
        })

        it('checks if StudentsModel deleteStudent was created', function()
        {
            var student = new StudentModel();
            assert.strictEqual(typeof student.deleteStudent, "function");
        })
    })
})