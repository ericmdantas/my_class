"use strict";

describe('TeacherService', function()
{
    var _TeacherService, _httpMock, _lib;
    var WEBSERVICE = '/api/protected/teachers';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _TeacherService = $injector.get('TeacherService');
        _httpMock = $injector.get('$httpBackend');
        _lib = $injector.get('lib');
    }))

    describe('getAll', function()
    {
        it('should try to get all the teachers, but the server returns error', function()
        {
            spyOn(_lib, 'createAlert').andCallThrough();
            _httpMock.expectGET(WEBSERVICE).respond(500);

            var _onError = function()
            {
                expect(_lib.createAlert).toHaveBeenCalled();
            }

            _TeacherService
                .getAll()
                .then(undefined, _onError);

            _httpMock.flush();
        })

        it('should try to get all the teachers, but the server returns an empty array', function()
        {
            spyOn(_lib, 'createAlert').andCallThrough();
            _httpMock.expectGET(WEBSERVICE).respond(null);

            var _onSuccess = function(teachers)
            {
                expect(_lib.createAlert).not.toHaveBeenCalled();
                expect(teachers.length).toBe(0);
            }

            _TeacherService
                .getAll()
                .then(_onSuccess);

            _httpMock.flush();
        })

        it('should try to get all the teachers and the server returns the correct array', function()
        {
            var _firstTeacher = {nome: 'A', salary: 10, address: 'Address', birthDate: '26/06/89'};
            var _secondTeacher = {nome: 'B', salary: 11, address: 'Addrezz', birthDate: '26/06/90'};

            spyOn(_lib, 'createAlert').andCallThrough();
            _httpMock.expectGET(WEBSERVICE).respond([_firstTeacher, _secondTeacher]);

            var _onSuccess = function(teachers)
            {
                expect(_lib.createAlert).not.toHaveBeenCalled();
                expect(teachers.length).toBe(2);

                for (var i in teachers[0])
                {
                    if (i && ("function" !== typeof i) && (_firstTeacher[i]))
                        expect(teachers[0][i]).toEqual(_firstTeacher[i]);
                }

                for (var j in teachers[1])
                {
                    if (j && ("function" !== typeof j) && (_secondTeacher[j]))
                        expect(teachers[1][j]).toEqual(_secondTeacher[j]);
                }
            }

            _TeacherService
                .getAll()
                .then(_onSuccess);

            _httpMock.flush();
        })
    })

    describe('get', function()
    {
        it('should try to get all the teachers, but the server returns error', function()
        {
            spyOn(_lib, 'createAlert').andCallThrough();
            _httpMock.expectGET(WEBSERVICE).respond(500);

            var _invalidIds = helper.invalidStrings();

            for (var i = 0; i < _invalidIds.length; i++)
            {
                var _onError = function(error)
                {
                    expect(error).toBeDefined();
                }

                _TeacherService
                    .get(_invalidIds[i])
                    .then(undefined, _onError);
            }
        })

        it('should try to get the teacher by id, but the server returns null', function()
        {
            var _id = 'a123';

            _httpMock.expectGET(WEBSERVICE + '/' + _id).respond(null);

            var _onError = function(error)
            {
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível buscar o professor com o id informado');
            }

            _TeacherService
                .get(_id)
                .then(undefined, _onError);

            _httpMock.flush();
        })

        it('should try to get the teacher by id and the server returns the correct object', function()
        {
            var _id = 'a123';
            var _teacher = {nome: 'A', salary: 10, address: 'Address', birthDate: '26/06/89'};

            _httpMock.expectGET(WEBSERVICE + '/' + _id).respond(_teacher);

            var _onSuccess = function(teacher)
            {
                expect(typeof teacher).toBe('object');
                expect(teacher.nome).toEqual('A');
                expect(teacher.salary).toEqual(10);
                expect(teacher.address).toEqual('Address');
                expect(teacher.birthDate).toEqual('26/06/89');
            }

            _TeacherService
                .get(_id)
                .then(_onSuccess);

            _httpMock.flush();
        })
    })

    describe('getAllTeachersProp', function()
    {
        it('should try to get all the teachers by name, but the server returns error', function()
        {
            var _prop = 'name';

            _httpMock.expectGET(WEBSERVICE + '/' + _prop).respond(500);

            var _invalidProps = helper.invalidStrings();

            for (var i = 0; i < _invalidProps.length; i++)
            {
                var _onError = function(error)
                {
                    expect(error instanceof Error).toBeTruthy();
                    expect(error).toContain('Propriedade não é válida para buscar os professores.');
                }

                _TeacherService
                    .getAllTeachersProp(_invalidProps[i])
                    .then(undefined, _onError);
            }
        })

        it('should try to get the teachers names, but the server returns null', function()
        {
            var _prop = 'name';

            _httpMock.expectGET(WEBSERVICE + '/' + _prop).respond(null);

            var _onError = function(error)
            {
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Propriedade não é válida para buscar os professores.');
            }

            _TeacherService
                .getAllTeachersProp(_prop)
                .then(undefined, _onError);

            _httpMock.flush();
        })

        it('should try to get the teachers names and the server returns the correct array', function()
        {
            var _name = 'name';
            var _teachers = [{nome: 'A', salary: 10, address: 'Address', birthDate: '26/06/89'}];

            _httpMock.expectGET(WEBSERVICE + '/' + _name).respond(_teachers);

            var _onSuccess = function(teachers)
            {
                expect(typeof teachers).toBe('object');
                expect(teachers.length).toBe(1);
                expect(teachers[0].nome).toEqual('A');
                expect(teachers[0].salary).toEqual(10);
                expect(teachers[0].address).toEqual('Address');
                expect(teachers[0].birthDate).toEqual('26/06/89');
            }

            _TeacherService
                .getAllTeachersProp(_name)
                .then(_onSuccess);

            _httpMock.flush();
        })
    })

    describe('save', function()
    {
        it('should throw an error, object is invalid', function()
        {
            var _invalidObjects = helper.invalidObjects();

            var _onError = function(error)
            {
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível cadastrar um professor sem informações.');
            }

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                _TeacherService
                    .save(_invalidObjects[i])
                    .then(undefined, _onError);
            }
        })

        it('should try to save teacher, but the server returns an error - 500', function()
        {
            var _teacher = {name: 'T', birthDate: '26/06/89', salary: 10, address: 'Rjua'};
            _httpMock.expectPOST(WEBSERVICE, _teacher).respond(500);

            var _onSuccess = function()
            {
                expect(false).toBeTruthy(); // has not been here
            }

            var _onError = function()
            {
                expect(true).toBeTruthy(); // has been here
            }

            _TeacherService
                .save(_teacher)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        it('should save the teacher correctly', function()
        {
            var _teacher = {name: 'T', birthDate: '26/06/89', salary: 10, address: 'Rjua'};
            _httpMock.expectPOST(WEBSERVICE, _teacher).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeTruthy(); // has been here
            }

            var _onError = function()
            {
                expect(false).toBeTruthy(); // has not been here
            }

            _TeacherService
                .save(_teacher)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })
    })

    describe('update', function()
    {
        it('should throw an error, teacher doesn\'t have an id', function()
        {
            var _invalidTeacher = {name: 'T', birthDate: '26/06/89', salary: 10, address: 'Rjua'};

            var _onError = function(error)
            {
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível editar um professor sem id.');
            }

            _TeacherService
                .update(_invalidTeacher)
                .then(undefined, _onError);
        })

        it('should try to update teacher, but the server returns an error - 500', function()
        {
            var _teacher = {_id: 'a123', name: 'T', birthDate: '26/06/89', salary: 10, address: 'Rjua'};
            _httpMock.expectPUT(WEBSERVICE + '/a123', _teacher).respond(500);

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _TeacherService
                .update(_teacher)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        it('should save the teacher correctly', function()
        {
            var _teacher = {_id: 'a123', name: 'T', birthDate: '26/06/89', salary: 10, address: 'Rjua'};
            _httpMock.expectPUT(WEBSERVICE + '/a123', _teacher).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            var _onError = function()
            {
                expect(false).toBeTruthy();
            }

            _TeacherService
                .update(_teacher)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })
    })

    describe('remove', function()
    {
        it('should try to update teacher, but the server returns an error - 500', function()
        {
            var _id = 'a123';
            _httpMock.expectDELETE(WEBSERVICE + '/a123').respond(500);

            var _onSuccess = function()
            {
                expect(false).toBeTruthy(); // has not been here
            }

            var _onError = function()
            {
                expect(true).toBeTruthy(); // has been here
            }

            _TeacherService
                .remove(_id)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })

        it('should save the teacher correctly', function()
        {
            var _id = 'a123';
            _httpMock.expectDELETE(WEBSERVICE + '/a123').respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeTruthy(); // has been here
            }

            var _onError = function()
            {
                expect(false).toBeTruthy(); // has not been here
            }

            _TeacherService
                .remove(_id)
                .then(_onSuccess, _onError);

            _httpMock.flush();
        })
    })
})