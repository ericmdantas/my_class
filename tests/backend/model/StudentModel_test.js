"use strict";

var assert = require('assert'),
    StudentModel = require('../../../models/Student');

describe('Testing StudentsModel', function()
{
    var student;

    beforeEach(function()
    {
        student = new StudentModel();
    })


    describe('check elements creation', function()
    {
        it('checks if StudentsModel was created', function()
        {
            assert.strictEqual(typeof StudentModel, "function");
        })

        it('checks if StudentsModel findAllStudents was created', function()
        {
            assert.strictEqual(typeof student.findAllStudentsByUser, "function");
        })

        it('checks if StudentsModel registerStudent was created', function()
        {
            assert.strictEqual(typeof student.registerStudent, "function");
        })

        it('checks if StudentsModel editStudent was created', function()
        {
            assert.strictEqual(typeof student.editStudent, "function");
        })

        it('checks if StudentsModel deleteStudent was created', function()
        {
            assert.strictEqual(typeof student.deleteStudent, "function");
        })

        it('checks if StudentsModel findAllStudentsNames was created', function()
        {
            assert.strictEqual(typeof student.findAllStudentsNames, "function");
        })
    })
})