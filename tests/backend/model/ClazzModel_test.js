"use strict";

var assert = require('assert');
var ClazzModel = require('../../../models/Clazz');
var mongoose = require('mongoose');
var dburl = require('../config/db.json');

describe('ClazzModel', function()
{
    before(function()
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    var wrongParams = [null, undefined, true, false, [], {}, 1, function(){}];

    describe('check elements creation', function()
    {
        it('checks if ClazzModel was created', function()
        {
            assert.strictEqual(typeof ClazzModel, "function");
        })

        it('checks if ClazzModel.deleteClass was created', function()
        {
            var clazz = new ClazzModel();
            assert.strictEqual(typeof clazz.deleteClass, "function");
        })

        it('checks if ClazzModel.editClass was created', function()
        {
            var clazz = new ClazzModel();
            assert.strictEqual(typeof clazz.editClass, "function");
        })

        it('checks if ClazzModel.findAllClassesByUser was created', function()
        {
            var clazz = new ClazzModel();
            assert.strictEqual(typeof clazz.findAllClassesByUser, "function");
        })

        it('checks if ClazzModel.registerNewClass was created', function()
        {
            var clazz = new ClazzModel();
            assert.strictEqual(typeof clazz.registerNewClass, "function");
        })

        it('checks if ClazzModel.registerMomentInTime was created', function()
        {
            var clazz = new ClazzModel();
            assert.strictEqual(typeof clazz.registerClassMomentInTime, 'function');
        })
    })
    
    describe('findAllClassesByUser', function()
    {
        beforeEach(function(done)
        {
            ClazzModel.create({
                    name: "Turma1",
                    students: ["Aluno1"],
                    time: "15:00",
                    registered: new Date(),
                    lastModified: new Date(),
                    usersAllowed: ["eric3"],
                    dailyInfo: [{
                                day: "01",
                                monthYear: "01/2014",
                                teacherName: "Teacher1",
                                subject: "matéria1",
                                studentByDay: [{
                                                    name: "Aluno1",
                                                    wasInClass: true
                                              }]
                               }]
                             }, done);
        })

        afterEach(function(done)
        {
            ClazzModel.remove(done);
        })

        it('should not return classes - empty user', function(done)
        {
            var _clazz = new ClazzModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.findAllClassesByUser(wrongParams[i], function(err, clazzes)
                                                            {
                                                                assert.notStrictEqual(err, null);
                                                                assert.strictEqual(err instanceof Error, true);
                                                                assert.strictEqual(clazzes, null);
                                                            })
            }

            done();
        })

        it('should not return classes - wrong user', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "NO_EXCISTE";

            _clazz.findAllClassesByUser(_usuario, function(err, clazzes)
                                                  {
                                                      assert.strictEqual(err, null);
                                                      assert.strictEqual(typeof clazzes, "object");
                                                      assert.strictEqual(clazzes.length, 0);
                                                  })
            done();
        })

        it('should return classes correctly', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";

            _clazz.findAllClassesByUser(_usuario, function(err, clazzes)
                                                  {
                                                      assert.strictEqual(err, null);
                                                      assert.strictEqual(typeof clazzes, "object");
                                                      assert.strictEqual(clazzes.length, 1);
                                                      assert.strictEqual(clazzes[0].name, "Turma1");
                                                      assert.strictEqual(clazzes[0].students[0], "Aluno1");
                                                      assert.strictEqual(clazzes[0].time, "15:00");
                                                      assert.strictEqual(clazzes[0].usersAllowed, undefined);
                                                      assert.strictEqual(clazzes[0].dailyInfo, undefined);

                                                      done();
                                                  })
        })

    })

    describe('findAllClassesNamesByUser', function()
    {
        beforeEach(function(done)
        {
            ClazzModel.create({
                name: "Turma1",
                students: ["Aluno1"],
                time: "15:00",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"],
                dailyInfo: [{
                    day: "01",
                    monthYear: "01",
                    teacherName: "Teacher1",
                    subject: "matéria1",
                    studentByDay: [{
                        name: "Aluno1",
                        wasInClass: true
                    }]
                }]
            },
            {
                name: "Turma1",
                students: ["Aluno1"],
                time: "15:00",
                registered: new Date(),
                lastModified: new Date(),
                usersAllowed: ["eric3"],
                dailyInfo: [{
                    day: "01",
                    monthYear: "01",
                    teacherName: "Teacher1",
                    subject: "matéria1",
                    studentByDay: [{
                        name: "Aluno1",
                        wasInClass: true
                    }]
                }]
            }, done);
        })

        afterEach(function(done)
        {
            ClazzModel.remove(done);
        })

        it('shouldn\'t return any document - empty user', function(done)
        {
            var _clazz = new ClazzModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.findAllClassesNamesByUser(wrongParams[i], function(err, clazzNames)
                                                                 {
                                                                     assert.notStrictEqual(err, null);
                                                                     assert.strictEqual(err instanceof Error, true);
                                                                     assert.strictEqual(clazzNames, null);
                                                                 })
            }

            done();
        })

        it('shouldn\'t return any document - wrong user', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "NO_EXCSISTE";

            _clazz.findAllClassesNamesByUser(_usuario, function(err, clazzNames)
                                                       {
                                                           assert.strictEqual(err, null);
                                                           assert.strictEqual(typeof clazzNames, "object");
                                                           assert.strictEqual(clazzNames.length, 0);
                                                       })

            done();
        })

        it('should return clazzesNames correctly', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";

            _clazz.findAllClassesNamesByUser(_usuario, function(err, clazzNames)
                                                       {
                                                           assert.strictEqual(err, null);
                                                           assert.strictEqual(typeof clazzNames, "object");
                                                           assert.strictEqual(clazzNames.length, 2);
                                                       })

            done();
        })
    })

    describe('registerNewClass', function()
    {
        afterEach(function(done)
        {
            ClazzModel.remove(done);
        })

        it('shouldn\'t register clazz - empty user', function(done)
        {
            var _clazz = new ClazzModel();
            var _turma = "turma";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.registerNewClass(wrongParams[i], _turma, function(err)
                                                                {
                                                                    assert.notStrictEqual(err, null);
                                                                    assert.strictEqual(err instanceof Error, true);
                                                                })
            }

            done();
        })

        it('shouldn\'t register clazz - empty clazz', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.registerNewClass(_usuario, wrongParams[i], function(err)
                                                                  {
                                                                      assert.notStrictEqual(err, null);
                                                                      assert.strictEqual(err instanceof Error, true);
                                                                  })
            }

            done();
        })

        it('shouldn\'t register clazz - both user and clazz are empty', function(done)
        {
            var _clazz = new ClazzModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.registerNewClass(wrongParams[i], wrongParams[i], function(err)
                                                                        {
                                                                            assert.notStrictEqual(err, null);
                                                                            assert.strictEqual(err instanceof Error, true);
                                                                        })
            }

            done();
        })

        it('should register clazz correctly', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";
            var _turma = {name: "Turma1"};


            _clazz.registerNewClass(_usuario, _turma, function(err)
                                                      {
                                                          assert.notStrictEqual(err, null);
                                                          assert.strictEqual(err instanceof Error, true);
                                                          done();
                                                      })
        })
    })

    describe('registerClassMomentInTime', function()
    {
        afterEach(function(done)
        {
            ClazzModel.remove(done);
        })

        it('shouldn\'t register momentTime - empty user', function(done)
        {
            var _clazz = new ClazzModel();
            var _turma = "turma";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.registerClassMomentInTime(wrongParams[i], _turma, function(err)
                                                                         {
                                                                            assert.notStrictEqual(err, null);
                                                                            assert.strictEqual(err instanceof Error, true);
                                                                         })
            }

            done();
        })

        it('shouldn\'t register momentTime - empty clazz', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.registerClassMomentInTime(_usuario, wrongParams[i], function(err)
                                                                           {
                                                                                 assert.notStrictEqual(err, null);
                                                                                 assert.strictEqual(err instanceof Error, true);
                                                                           })
            }

            done();
        })

        it('shouldn\'t register momentTime - both user and clazz are empty', function(done)
        {
            var _clazz = new ClazzModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.registerClassMomentInTime(wrongParams[i], wrongParams[i], function(err)
                                                                                 {
                                                                                     assert.notStrictEqual(err, null);
                                                                                     assert.strictEqual(err instanceof Error, true);
                                                                                 })
            }

            done();
        })

        it('should register clazz correctly', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";
            var _turma = {
                            dailyInfo:
                            {
                                day: "01",
                                monthYear: "01",
                                teacherName: "Teacher1",
                                subject: "matéria1",
                                studentByDay: [{
                                                    name: "Aluno1",
                                                    wasInClass: true
                                              }]
                            }
                         };


            _clazz.registerClassMomentInTime(_usuario, _turma, function(err)
                                                               {
                                                                   assert.strictEqual(err, null);
                                                                   done();
                                                               })
        })
    })

    describe('editClass', function()
    {
        beforeEach(function(done)
        {
            ClazzModel.create({
                    name: "Turma1",
                    students: ["Aluno1"],
                    time: "15:00",
                    registered: new Date(),
                    lastModified: new Date(),
                    usersAllowed: ["eric3"],
                    dailyInfo: [{
                        day: "01",
                        monthYear: "01",
                        teacherName: "Teacher1",
                        subject: "matéria1",
                        studentByDay: [{
                            name: "Aluno1",
                            wasInClass: true
                        }]
                    }]
                },
                {
                    name: "Turma2",
                    students: ["Aluno1"],
                    time: "15:00",
                    registered: new Date(),
                    lastModified: new Date(),
                    usersAllowed: ["eric3"],
                    dailyInfo: [{
                        day: "01",
                        monthYear: "01",
                        teacherName: "Teacher1",
                        subject: "matéria1",
                        studentByDay: [{
                            name: "Aluno1",
                            wasInClass: true
                        }]
                    }]
                }, done);
        })

        afterEach(function(done)
        {
            ClazzModel.remove(done);
        })

        it('shouldn\'t edit clazz - empty user', function(done)
        {
            var _clazz = new ClazzModel();
            var _turma = "turma";
            var _id = "id";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.editClass(wrongParams[i], _turma, _id, function(err)
                                                              {
                                                                  assert.notStrictEqual(err, null);
                                                                  assert.strictEqual(err instanceof Error, true);
                                                              })
            }

            done();
        })

        it('shouldn\'t edit class - empty clazz', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";
            var _id = "id";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.editClass(_usuario, wrongParams[i], _id, function(err)
                                                                {
                                                                     assert.notStrictEqual(err, null);
                                                                     assert.strictEqual(err instanceof Error, true);
                                                                })
            }

            done();
        })

        it('shouldn\'t edit class - empty id', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";
            var _turma = "turma1";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.editClass(_usuario, _turma, wrongParams[i], function(err)
                                                                   {
                                                                       assert.notStrictEqual(err, null);
                                                                       assert.strictEqual(err instanceof Error, true);
                                                                   })
            }

            done();
        })

        it('shouldn\'t edit class - user, clazz and id are empty', function(done)
        {
            var _clazz = new ClazzModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.editClass(wrongParams[i], wrongParams[i], wrongParams[i], function(err)
                                                                                 {
                                                                                     assert.notStrictEqual(err, null);
                                                                                     assert.strictEqual(err instanceof Error, true);
                                                                                 })
            }

            done();
        })

        it('should edit clazz correctly', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";
            var _turma = {
                dailyInfo:
                {
                    day: "01",
                    monthYear: "01",
                    teacherName: "Teacher1",
                    subject: "matéria1",
                    studentByDay: [{
                        name: "Aluno1",
                        wasInClass: true
                    }]
                }
            };
            var _id = "534dafae51aaf04b9b8c5b6f";

            _clazz.editClass(_usuario, _turma, _id, function(err)
                                                    {
                                                        assert.strictEqual(err, null);
                                                        done();
                                                    })
        })
    })

    describe('deleteClass', function()
    {
        beforeEach(function(done)
        {
            ClazzModel.create({
                    name: "Turma1",
                    students: ["Aluno1"],
                    time: "15:00",
                    registered: new Date(),
                    lastModified: new Date(),
                    usersAllowed: ["eric3"],
                    dailyInfo: [{
                        day: "01",
                        monthYear: "01",
                        teacherName: "Teacher1",
                        subject: "matéria1",
                        studentByDay: [{
                            name: "Aluno1",
                            wasInClass: true
                        }]
                    }]
                },
                {
                    name: "Turma2",
                    students: ["Aluno1"],
                    time: "15:00",
                    registered: new Date(),
                    lastModified: new Date(),
                    usersAllowed: ["eric3"],
                    dailyInfo: [{
                        day: "01",
                        monthYear: "01",
                        teacherName: "Teacher1",
                        subject: "matéria1",
                        studentByDay: [{
                            name: "Aluno1",
                            wasInClass: true
                        }]
                    }]
                }, done);
        })

        afterEach(function(done)
        {
            ClazzModel.remove(done);
        })

        it('shouldn\'t delete clazz - empty user', function(done)
        {
            var _clazz = new ClazzModel();
            var _id = "id";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.deleteClass(wrongParams[i], _id, function(err)
                                                        {
                                                            assert.notStrictEqual(err, null);
                                                            assert.strictEqual(err instanceof Error, true);
                                                        })
            }

            done();
        })

        it('shouldn\'t edit class - empty id', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";
            var _id = "id";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.deleteClass(_usuario, wrongParams[i], function(err)
                                                           {
                                                               assert.notStrictEqual(err, null);
                                                               assert.strictEqual(err instanceof Error, true);
                                                           })
            }

            done();
        })

        it('shouldn\'t edit class - both user and id are empty', function(done)
        {
            var _clazz = new ClazzModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz.deleteClass(wrongParams[i], wrongParams[i], function(err)
                                                                 {
                                                                     assert.notStrictEqual(err, null);
                                                                     assert.strictEqual(err instanceof Error, true);
                                                                 })
            }

            done();
        })

        it('should delete clazz correctly', function(done)
        {
            var _clazz = new ClazzModel();
            var _usuario = "eric3";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _clazz.deleteClass(_usuario, _id, function(err)
                                              {
                                                  assert.strictEqual(err, null);
                                                  done();
                                              })
        })
    })
})