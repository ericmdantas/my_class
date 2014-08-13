"use strict";

var expect = require('chai').expect;
var ClazzModel = require('../../../models/Clazz');
var mongoose = require('mongoose');
var dburl = require('../helpers/db.json');
var DBCreator = require('../helpers/DBCreator');

describe('ClazzModel', function()
{
    var _clazz;

    before(function()
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    beforeEach(function(done)
    {
        _clazz = new ClazzModel();
        new DBCreator().create('clazz', done);
    })

    afterEach(function (done) {
        ClazzModel.remove(done);
    })

    var wrongParams = [null, undefined, true, false, [], {}, 1, function(){}];

    describe('check elements creation', function()
    {
        it('checks if ClazzModel was created', function()
        {
            expect(ClazzModel).to.be.an("function");
        })
    })
    
    describe('findAllClassesByUser', function()
    {
        it('should not return classes - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .findAllClassesByUser(wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should not return classes - wrong user', function(done)
        {
            var _onSuccess = function(clazzes)
            {
                expect(typeof clazzes).to.equal("object");
                expect(clazzes).to.have.length(0);

                done();
            }

            var _usuario = "NO_EXCISTE";

            _clazz
                .findAllClassesByUser(_usuario)
                .then(_onSuccess);
        })

        it('should return classes correctly', function(done)
        {
            var _onSuccess = function(clazzes)
            {
                expect(typeof clazzes).to.equal("object");
                expect(clazzes).to.have.length(5);
                expect(clazzes[0].name).to.equal("Turma1");
                expect(clazzes[0].students[0]).to.equal("Aluno1");
                expect(clazzes[0].time).to.equal("15:00");
                expect(clazzes[0].usersAllowed).to.not.exist;
                expect(clazzes[0].dailyInfo).to.not.exist;

                done();
            };

            var _usuario = "eric3";

            _clazz
                .findAllClassesByUser(_usuario)
                .then(_onSuccess);
        })

    })

    describe('findAllClassesNamesByUser', function()
    {
        it('shouldn\'t return any document - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .findAllClassesNamesByUser(wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return any document - wrong user', function(done)
        {
            var _onSuccess = function(clazzNames)
            {
                expect(typeof clazzNames).to.equal("object");
                expect(clazzNames).to.have.length(0);

                done();
            };

            var _usuario = "NO_EXCSISTE";

            _clazz
                .findAllClassesNamesByUser(_usuario)
                .then(_onSuccess);
        })

        it('should return clazzesNames correctly', function(done)
        {
            var _onSuccess = function(clazzNames)
            {
                expect(typeof clazzNames).to.equal("object");
                expect(clazzNames).to.have.length(5);

                done();
            };

            var _usuario = "eric3";

            _clazz
                .findAllClassesNamesByUser(_usuario)
                .then(_onSuccess);
        })
    })

    describe('getClassesDailyInfo', function()
    {
        it('shouldn\'t return any document - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _monthYear = '04_2014';

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .getClassesDailyInfo(wrongParams[i], _monthYear)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return any document - empty monthYear', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .getClassesDailyInfo(_usuario, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should return document correctly', function(done)
        {
            var _onSuccess = function(err, clazzesInfo)
            {
                expect(clazzesInfo).to.have.length(2);
                expect(clazzesInfo[0].name).to.equal("Turma1");
                expect(clazzesInfo[0].time).to.equal("15:00");
                expect(clazzesInfo[0].usersAllowed).to.not.exist;
                expect(clazzesInfo[0].dailyInfo).to.have.length(2);
                expect(clazzesInfo[0].dailyInfo[0].day).to.equal("01");
                expect(clazzesInfo[0].dailyInfo[1].day).to.equal("02");
                expect(clazzesInfo[0].dailyInfo[0].monthYear).to.equal("04_2014");
                expect(clazzesInfo[0].dailyInfo[1].monthYear).to.equal("04_2014");
                expect(clazzesInfo[0].dailyInfo[0].teacherName).to.equal("Teacher1");
                expect(clazzesInfo[0].dailyInfo[1].teacherName).to.equal("Teacher2");
                expect(clazzesInfo[0].dailyInfo[0].subject).to.equal("matéria1");
                expect(clazzesInfo[0].dailyInfo[1].subject).to.equal("matéria2");
                expect(clazzesInfo[0].dailyInfo[0].studentByDay).to.have.length(1);
                expect(clazzesInfo[0].dailyInfo[1].studentByDay).to.have.length(1);
                done();
            }

            var _usuario = "eric3";
            var _monthYear = '04_2014';

            _clazz
                .getClassesDailyInfo(_usuario, _monthYear)
                .then(_onSuccess);
        })
    })

    describe('getClassesDailyInfoByClass', function()
    {
        it('shouldn\'t return any document - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _monthYear = '04_2014';
            var _id = 'a123';

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .getClassesDailyInfoByClass(wrongParams[i], _monthYear, _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return any document - empty monthYear', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";
            var _id = 'a123'

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .getClassesDailyInfoByClass(_usuario, wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return any document - empty id', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";
            var _monthYear = '04_2014';

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .getClassesDailyInfoByClass(_usuario, _monthYear, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should return document correctly', function(done)
        {
            var _onSuccess = function(clazzesInfo)
            {
                expect(clazzesInfo).to.be.defined;
                expect(clazzesInfo.name).to.equal("Turma3");
                expect(clazzesInfo.time).to.equal("15:00");
                expect(clazzesInfo.usersAllowed).to.not.exist;
                expect(clazzesInfo.dailyInfo).to.have.length(1);
                expect(clazzesInfo.dailyInfo[0].day).to.equal("01");
                expect(clazzesInfo.dailyInfo[0].monthYear).to.equal("04_2014");
                expect(clazzesInfo.dailyInfo[0].teacherName).to.equal("Teacher1");
                expect(clazzesInfo.dailyInfo[0].subject).to.equal("matéria1");
                expect(clazzesInfo.dailyInfo[0].studentByDay).to.have.length(1);
                done();
            };

            var _usuario = "eric3";
            var _monthYear = '04_2014';
            var _id = '534dafae51aaf04b9b8c5b6f';

            _clazz
                .getClassesDailyInfoByClass(_usuario, _monthYear, _id)
                .then(_onSuccess);
        })
    })

    describe('registerNewClass', function()
    {
        it('shouldn\'t register _clazz - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _turma = "turma";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .registerNewClass(wrongParams[i], _turma)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register _clazz - empty _clazz', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .registerNewClass(_usuario, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register _clazz - both user and _clazz are empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .registerNewClass(wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should register _clazz correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            };

            var _usuario = "eric3";
            var _turma = {name: "Turma1", students: ["eu", "fulano"]};

            _clazz
                .registerNewClass(_usuario, _turma)
                .then(_onSuccess);
        })
    })

    describe('registerClassMomentInTime', function()
    {
        it('shouldn\'t register momentTime - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _turma = "turma";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .registerClassMomentInTime(wrongParams[i], _turma)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register momentTime - empty _clazz', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .registerClassMomentInTime(_usuario, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register momentTime - both user and _clazz are empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .registerClassMomentInTime(wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should register _clazz correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            };

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


            _clazz
                .registerClassMomentInTime(_usuario, _turma)
                .then(_onSuccess);
        })
    })

    describe('editClass', function()
    {
        it('shouldn\'t edit _clazz - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _turma = "turma";
            var _id = "id";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .editClass(wrongParams[i], _turma, _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit class - empty _clazz', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";
            var _id = "id";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .editClass(_usuario, wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit class - empty id', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";
            var _turma = "turma1";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .editClass(_usuario, _turma, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit class - user, _clazz and id are empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .editClass(wrongParams[i], wrongParams[i], wrongParams[i])
                    .then(undefined, _onError)
            }

            done();
        })

        it('should edit _clazz correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            };

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

            _clazz
                .editClass(_usuario, _turma, _id)
                .then(_onSuccess);
        })
    })

    describe('deleteClass', function()
    {
        it('shouldn\'t delete _clazz - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _id = "id";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .deleteClass(wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit class - empty id', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .deleteClass(_usuario, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit class - both user and id are empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _clazz
                    .deleteClass(wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should delete _clazz correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            };

            var _usuario = "eric3";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _clazz
                .deleteClass(_usuario, _id)
                .then(_onSuccess);
        })
    })
})