"use strict";

var expect = require('chai').expect;
var TeacherModel = require('../../../models/Teacher');
var mongoose = require('mongoose');
var dburl = require('../helpers/db.json');
var DBCreator = require('../helpers/DBCreator');

describe('TeacherModel', function()
{
    var _teacher;
    var wrongParams = [null, undefined, true, false, [], {}, 1, function(){}];

    before(function()
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    beforeEach(function()
    {
        _teacher = new TeacherModel();
        new DBCreator().create('teacher');
    })

    afterEach(function(done)
    {
        TeacherModel.remove(done);
    })

    describe('check elements creation', function()
    {
        it('checks if TeacherModel was created', function()
        {
            expect(TeacherModel).to.be.a("function");
        })
    })
    
    describe('findAllTeachersByUser', function()
    {
        it('should return error - params filled wrong - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .findAllTeachersByUser(wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return any info - wrong user', function(done)
        {
            var _onSuccess = function(teachers)
            {
                expect(teachers).to.have.length(0);
                done();
            };

            var _user = "NO_ECSIXTE";

            _teacher
                .findAllTeachersByUser(_user)
                .then(_onSuccess);
        })

        it('should return teachers info correctly', function(done)
        {
            var _onSuccess = function(teachers)
            {
                expect(typeof teachers).to.equal("object");
                expect(teachers).to.have.length(4);
                expect(teachers[0]._id).to.be.an("object");
                expect(teachers[0].name).to.equal("Professor1");
                expect(teachers[0].birthDate).to.equal("26/06/1989");
                expect(teachers[0].admission).to.equal("26/06/1999");
                expect(teachers[0].availability).to.equal("15:00");
                expect(teachers[0].email).to.equal("ericdantas0@hotmail.com");
                expect(teachers[0].mobilePhone).to.equal("98969896");
                expect(teachers[0].phone).to.equal("27410707");
                expect(teachers[0].salary).to.equal("123123");
                expect(teachers[0].address).to.equal("Rua Endereço Qualquer");
                expect(teachers[0].usersAllowed).to.not.exist;
                done();
            };

            var _user = "eric3";

            _teacher
                .findAllTeachersByUser(_user)
                .then(_onSuccess);
        })
    })

    describe('findAllTeachersNames', function()
    {
        it('shouldn\'t return anything - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .findAllTeachersNames(wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t return anything - wrong user', function(done)
        {
            var _onSuccess = function(teachers)
            {
                expect(teachers).to.have.length(0);
                done();
            };

            var _user = "NO_ECSIXTE";

            _teacher
                .findAllTeachersNames(_user)
                .then(_onSuccess);
        })

        it('should return teachers names correctly', function(done)
        {
            var _onSuccess = function(teachers)
            {
                expect(typeof teachers).to.equal("object");
                expect(teachers).to.have.length(4);
                expect(teachers[0].name).to.be.a("string");
                expect(teachers[0]._id).to.be.an("object");
                expect(teachers[0].birthDate).to.not.exist;
                expect(teachers[0].admission).to.not.exist;
                expect(teachers[0].availability).to.not.exist;
                expect(teachers[0].email).to.not.exist;
                expect(teachers[0].mobilePhone).to.not.exist;
                expect(teachers[0].phone).to.not.exist;
                expect(teachers[0].salary).to.not.exist;
                expect(teachers[0].address).to.not.exist;
                expect(teachers[0].usersAllowed).to.not.exist;

                done();
            };

            var _user = "eric3";

            _teacher
                .findAllTeachersNames(_user)
                .then(_onSuccess);
        })
    })

    describe('registerNewTeacher', function()
    {
        it('shouldn\'t register a teacher - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _professor = {name: "Professor1"};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .registerNewTeacher(wrongParams[i], _professor)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register a teacher - empty teacher', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _user = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .registerNewTeacher(_user, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t register a teacher - both teacher and user are empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .registerNewTeacher(wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should register a teacher correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            };

            var _user = "eric3";
            var _professor = {name: 'Professor Qualquer'};

            _teacher
                .registerNewTeacher(_user, _professor)
                .then(_onSuccess);
        })
    })

    describe('editTeacher', function()
    {
        it('shouldn\'t edit teacher - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _professor = {name: "Professor1"};
            var _id = "abc123";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .editTeacher(wrongParams[i], _professor, _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit teacher - empty teacher', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "987eric";
            var _id = "abc123";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .editTeacher(_usuario, wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit teacher - empty id', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "987eric";
            var _professor = {name: "Professor1"};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .editTeacher(_usuario, _professor, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t edit teacher - all empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .editTeacher(wrongParams[i], wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should edit teacher correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            };

            var _usuario = "987eric";
            var _professor = {name: "Professor1"};
            var _id = "534dafae51aaf04b9b8c5b6f";

            _teacher
                .editTeacher(_usuario, _professor, _id)
                .then(_onSuccess);
        })
    })

    describe('deleteTeacher', function()
    {
        it('shouldn\'t delete teacher - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _id = "id123";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .deleteTeacher(wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t delete teacher - empty id', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _usuario = "eric3";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _teacher
                    .deleteTeacher(_usuario, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should delete teacher correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            }

            var _usuario = "eric3";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _teacher
                .deleteTeacher(_usuario, _id)
                .then(_onSuccess);
        })
    })
})