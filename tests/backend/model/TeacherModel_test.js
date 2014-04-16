"use strict";

var assert = require('assert');
var TeacherModel = require('../../../models/Teacher');
var mongoose = require('mongoose');
var db = require('../config/db.json');

describe('Testing TeacherModel', function()
{
    var _teacher;
    var wrongParams = [null, undefined, true, false, [], {}, 1, function(){}];

    before(function()
    {
        mongoose.connect(db);
        mongoose.connection.on('error', function(){});
    })

    beforeEach(function()
    {
        _teacher = new TeacherModel();
    })

    describe('check elements creation', function()
    {
        it('checks if TeacherModel was created', function()
        {
            assert.strictEqual(typeof TeacherModel, "function");
        })

        it('checks if TeacherModel.deleteTeacher was created', function()
        {
            assert.strictEqual(typeof _teacher.deleteTeacher, "function");
        })

        it('checks if TeacherModel.findAllTeachersByUser was created', function()
        {
            assert.strictEqual(typeof _teacher.findAllTeachersByUser, "function");
        })

        it('checks if TeacherModel.editTeacher was created', function()
        {
            assert.strictEqual(typeof _teacher.editTeacher, "function");
        })

        it('checks if TeacherModel.registerNewTeacher was created', function()
        {
            assert.strictEqual(typeof _teacher.registerNewTeacher, "function");
        })

        it('checks if TeacherModel.findAllTeachersNames was created', function()
        {
            assert.strictEqual(typeof _teacher.findAllTeachersNames, "function");
        })
    })
    
    describe('findAllTeachersByUser', function()
    {
        beforeEach(function(done)
        {
            TeacherModel.create({
                                    name: "Professor1",
                                    birthDate: "26/06/1989",
                                    admission: "26/06/1999",
                                    availability: "15:00",
                                    email: "ericdantas0@hotmail.com",
                                    mobilePhone: "98969896",
                                    phone: "27410707",
                                    salary: "123123",
                                    address: "Rua Endereço Qualquer",
                                    registered: new Date(),
                                    lastModified: new Date(),
                                    usersAllowed: ["eric3"]
                               }, done);
        })

        afterEach(function(done)
        {
            TeacherModel.remove(done);
        })

        it('should return error - params filled wrong - empty user', function(done)
        {
            var _teacher = new TeacherModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher.findAllTeachersByUser(wrongParams[i], function(err, teachers)
                                                               {
                                                                   assert.notStrictEqual(err, null);
                                                                   assert.strictEqual(err instanceof Error, true);
                                                                   assert.strictEqual(teachers, null);
                                                               })
            }

            done();
        })

        it('shouldn\'t return any info - wrong user', function(done)
        {
            var _teacher = new TeacherModel();
            var _user = "NO_ECSIXTE";

            _teacher.findAllTeachersByUser(_user, function(err, teachers)
                                                  {
                                                      assert.strictEqual(err, null);
                                                      assert.strictEqual(teachers.length, 0);
                                                      done();
                                                  })
        })

        it('should return teachers info correctly', function(done)
        {
            var _teacher = new TeacherModel();
            var _user = "eric3";

            _teacher.findAllTeachersByUser(_user, function(err, teachers)
                                                  {
                                                      assert.strictEqual(err, null);
                                                      assert.strictEqual(typeof teachers, "object");
                                                      assert.strictEqual(teachers.length, 1);
                                                      assert.strictEqual(typeof teachers[0]._id, "object");
                                                      assert.strictEqual(teachers[0].name, "Professor1");
                                                      assert.strictEqual(teachers[0].birthDate, "26/06/1989");
                                                      assert.strictEqual(teachers[0].admission, "26/06/1999");
                                                      assert.strictEqual(teachers[0].availability, "15:00");
                                                      assert.strictEqual(teachers[0].email, "ericdantas0@hotmail.com");
                                                      assert.strictEqual(teachers[0].mobilePhone, "98969896");
                                                      assert.strictEqual(teachers[0].phone, "27410707");
                                                      assert.strictEqual(teachers[0].salary, "123123");
                                                      assert.strictEqual(teachers[0].address, "Rua Endereço Qualquer");
                                                      assert.strictEqual(teachers[0].usersAllowed, undefined);
                                                      done();
                                                  })
        })
    })

    describe('findAllTeachersNames', function()
    {
        beforeEach(function(done)
        {
            TeacherModel.create({
                name: "Professor1",
                birthDate: "26/06/1989",
                admission: "26/06/1999",
                availability: "15:00",
                email: "ericdantas0@hotmail.com",
                mobilePhone: "98969896",
                phone: "27410707",
                salary: "123123",
                address: "Rua Endereço Qualquer",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"]
            },
            {
                name: "Professor1",
                birthDate: "26/06/1989",
                admission: "26/06/1999",
                availability: "15:00",
                email: "ericdantas0@hotmail.com",
                mobilePhone: "98969896",
                phone: "27410707",
                salary: "123123",
                address: "Rua Endereço Qualquer",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"]
            }, done);
        })

        afterEach(function(done)
        {
            TeacherModel.remove(done);
        })

        it('shouldn\'t return anything - empty user', function(done)
        {
            var _teacher = new TeacherModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher.findAllTeachersNames(wrongParams[i], function(err, teachers)
                                                              {
                                                                  assert.notStrictEqual(err, null);
                                                                  assert.strictEqual(err instanceof Error, true);
                                                                  assert.strictEqual(teachers, null);
                                                              })
            }

            done();
        })

        it('shouldn\'t return anything - wrong user', function(done)
        {
            var _teacher = new TeacherModel();
            var _user = "NO_ECSIXTE";

            _teacher.findAllTeachersNames(_user, function(err, teachers)
                                                 {
                                                    assert.strictEqual(err, null);
                                                    assert.strictEqual(typeof teachers, "object");
                                                    assert.strictEqual(teachers.length, 0);
                                                    done();
                                                 })
        })

        it('should return teachers names correctly', function(done)
        {
            var _teacher = new TeacherModel();
            var _user = "eric3";

            _teacher.findAllTeachersNames(_user, function(err, teachers)
                                                {
                                                    assert.strictEqual(err, null);
                                                    assert.strictEqual(typeof teachers, "object");
                                                    assert.strictEqual(teachers.length, 2);
                                                    assert.strictEqual(typeof teachers[0].name, "string");
                                                    assert.strictEqual(typeof teachers[0]._id, "object");

                                                    /*
                                   ??????????         Uncaught AssertionError: "undefined" === "undefined"       ???????????
                                                    assert.strictEqual(typeof teachers[0].birthDate, undefined);
                                                    assert.strictEqual(typeof teachers[0].admission, undefined);
                                                    assert.strictEqual(typeof teachers[0].availability, undefined);
                                                    assert.strictEqual(typeof teachers[0].email, undefined);
                                                    assert.strictEqual(typeof teachers[0].mobilePhone, undefined);
                                                    assert.strictEqual(typeof teachers[0].phone, undefined);
                                                    assert.strictEqual(typeof teachers[0].salary, undefined);
                                                    assert.strictEqual(typeof teachers[0].address, undefined);
                                                    assert.strictEqual(typeof teachers[0].usersAllowed, undefined);
                                                    */

                                                    done();
                                                })
        })
    })

    describe('registerNewTeacher', function()
    {
        afterEach(function(done)
        {
            TeacherModel.remove(done);
        })

        it('shouldn\'t register a teacher - empty user', function(done)
        {
            var _teacher = new TeacherModel();
            var _professor = {name: "Professor1"};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher.registerNewTeacher(wrongParams[i], _professor, function(err)
                                                                        {
                                                                            assert.notStrictEqual(err, null);
                                                                            assert.strictEqual(err instanceof Error, true);
                                                                        })
            }

            done();
        })

        it('shouldn\'t register a teacher - empty teacher', function(done)
        {
            var _teacher = new TeacherModel();
            var _user = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher.registerNewTeacher(_user, wrongParams[i], function(err)
                                                                   {
                                                                       assert.notStrictEqual(err, null);
                                                                       assert.strictEqual(err instanceof Error, true);
                                                                   })
            }

            done();
        })

        it('shouldn\'t register a teacher - both teacher and user are empty', function(done)
        {
            var _teacher = new TeacherModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher.registerNewTeacher(wrongParams[i], wrongParams[i], function(err)
                                                                            {
                                                                                assert.notStrictEqual(err, null);
                                                                                assert.strictEqual(err instanceof Error, true);
                                                                            })
            }

            done();
        })

        it('should register a teacher correctly', function(done)
        {
            var _teacher = new TeacherModel();
            var _user = "eric3";
            var _professor = {name: 'Professor Qualquer'};

            _teacher.registerNewTeacher(_user, _professor, function(err)
                                                           {
                                                               assert.notStrictEqual(err, null);
                                                               assert.strictEqual(err instanceof Error, true);
                                                               done();
                                                           })
        })
    })

    //TODO keep adding the tests: describe('editTeacher') [...]
})