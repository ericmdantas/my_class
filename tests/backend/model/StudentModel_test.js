"use strict";

var assert = require('assert');
var StudentModel = require('../../../models/Student');
var mongoose = require('mongoose');
var dburl = require('../config/db.json');

describe('Testing StudentsModel', function()
{
    var student;

    before(function()
    {
        mongoose.connect(dburl);
        mongoose.connection.on('error', function(){});
    })

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
            assert.strictEqual(typeof student.findAllStudentsNamesByClass, "function");
        })
    })

    describe('findAllStudentsByUser', function()
    {
        afterEach(function(done)
        {
            StudentModel.remove(done);
        })

        it('shouldn\'t return any document - empty user', function(done)
        {

        })

        it('shouldn\'t return any document - wrong user', function(done)
        {

        })

        it('should return document correctly', function(done)
        {

        })
    })
})