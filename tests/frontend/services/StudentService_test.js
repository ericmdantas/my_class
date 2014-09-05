"use strict";

describe('StudentService', function()
{
    var _StudentService, _httpMock, _Student;
    var WEBSERVICE = '/api/protected/students';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _StudentService = $injector.get('StudentService');
        _Student = $injector.get('Student');
    }))

    describe('getAll', function()
    {
        it('should try to get all the students, server returns error - 500', function()
        {
            var _error = {error: 'xyz'};

            _httpMock.expectGET(WEBSERVICE).respond(500, _error);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error).toEqual(_error);
            }

            _StudentService
                .getAll()
                .then(_onSuccess, _onError);
        })

        it('should to get all the students correctly', function()
        {
            var _response = [{name: 'A', birthDate: '26/06/1389'}];

            _httpMock.expectGET(WEBSERVICE).respond(_response);

            var _onSuccess = function(students)
            {
                expect(students[0].name).toEqual(_response[0].name);
                expect(students[0].birthDate).toEqual(_response[0].birthDate);
            }

            var _onError = function()
            {
                expect(false).toBeTruthy();
            }

            _StudentService
                .getAll()
                .then(_onSuccess, _onError);
        })
    })

    describe('getAllStudentsByProp', function()
    {
        it('should return an error - prop is not a valid string', function()
        {
            var _invalidStrings = helper.invalidStrings();

            var _onSuccess = function(students)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível buscar os alunos pela propriedade passada, pois a mesma não é válida.');
            }

            for (var i = 0; i < _invalidStrings.length; i++)
            {
                _StudentService
                    .getAllStudentsByProp(_invalidStrings[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should try to get the info, but the server returns an error', function()
        {
            var _prop = 'name';

            _httpMock.expectGET(WEBSERVICE + '/' + _prop).respond(500, {error: 'oi'})

            var _onSuccess = function(students)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.error).toEqual('oi');
            }

            _StudentService
                .getAllStudentsByProp(_prop)
                .then(_onSuccess, _onError);
        })

        it('should get students by property correctly', function()
        {
            var _prop = 'name';
            var _response = [{name: 'A', birthDate: '26/06/1989'}];
            _httpMock.expectGET(WEBSERVICE + '/' + _prop).respond(_response);

            var _onSuccess = function(students)
            {
                expect(students).toBeDefined();
                expect(students[0].name).toEqual(_response[0].name);
                expect(students[0].birthDate).toEqual(_response[0].birthDate);
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _StudentService
                .getAllStudentsByProp(_prop)
                .then(_onSuccess, _onError);
        })
    })

    describe('get', function()
    {
        it('should return an error - id is not a valid string', function()
        {
            var _invalidStrings = helper.invalidStrings();

            var _onSuccess = function(students)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível buscar as informações. Id Inválido.');
            }

            for (var i = 0; i < _invalidStrings.length; i++)
            {
                _StudentService
                    .get(_invalidStrings[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should try to get the info, but the server returns an error', function()
        {
            var _id = 'name';

            _httpMock.expectGET(WEBSERVICE + '/' + _id).respond(500, {error: 'oi'})

            var _onSuccess = function(students)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.error).toEqual('oi');
            }

            _StudentService
                .get(_id)
                .then(_onSuccess, _onError);
        })

        it('should get students by id', function()
        {
            var _id = 'a123';
            var _response = {name: 'A', birthDate: '26/06/1989'};
            _httpMock.expectGET(WEBSERVICE + '/' + _id).respond(_response);

            var _onSuccess = function(students)
            {
                expect(students).toBeDefined();
                expect(students[0].name).toEqual(_response[0].name);
                expect(students[0].birthDate).toEqual(_response[0].birthDate);
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _StudentService
                .get(_id)
                .then(_onSuccess, _onError);
        })
    })

    describe('save', function()
    {
        it('should reject, object is not a valid student', function()
        {
            var _invalidObjects = helper.invalidObjects();

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            for (var i = 0; i < _invalidObjects.length; i++)
            {
                _StudentService
                    .save(_invalidObjects[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should try to save, server returns error', function()
        {
            var _student = {name: 'A', birthDate: '26/06/1989'};
            _httpMock.expectPOST(WEBSERVICE, _student).respond(500, {error: 'someError'});

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(true).toBeTruthy();
            }

            _StudentService
                .save(_student)
                .then(_onSuccess, _onError);
        })

        it('should save the student correctly', function()
        {
            var _student = {name: 'A', birthDate: '26/06/1989'};
            _httpMock.expectPOST(WEBSERVICE, _student).respond({error: 'someError'});

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(false).toBeTruthy();
            }

            _StudentService
                .save(_student)
                .then(_onSuccess, _onError);
        })
    })

    describe('update', function()
    {
        it('should throw an error, student is invalid', function()
        {
            var _student = helper.invalidObjects();

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível editar o aluno, objeto inválido.');
            }

            for (var i = 0; i < _student.length; i++)
            {
                _StudentService
                    .update(_student[i])
                    .then(_onSuccess,_onError);
            }
        })

        it('should throw an error - id is not valid', function()
        {
            var _student = {name: 'eric', birthDate: '26/06/1989'};
            var _invalidIds = helper.invalidStrings();

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível editar o aluno, pois o id não é válido.');
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _student._id = _invalidIds[i];

                _StudentService
                    .update(_student)
                    .then(_onSuccess,_onError);
            }
        })

        it('should try to update, but the server return error', function()
        {
            var _student = {name: 'eric', birthDate: '26/06/1989', _id: 'a123'};
            _httpMock.expectPUT(WEBSERVICE + '/' + _student._id, _student).respond(500, {error: true});

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.error).toBeTruthy();
            }

            _StudentService
                .update(_student)
                .then(_onSuccess,_onError);
        })

        it('should update the student correctly', function()
        {
            var _student = {name: 'eric', birthDate: '26/06/1989', _id: 'a123'};
            _httpMock.expectPUT(WEBSERVICE + '/' + _student._id, _student).respond(200);

            var _onSuccess = function()
            {
                expect(false).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _StudentService
                .update(_student)
                .then(_onSuccess,_onError);
        })
    })

    describe('delete', function()
    {
        it('should throw an error - id is not valid', function()
        {
            var _invalidIds = helper.invalidStrings();

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível excluir o aluno, pois o id não é válido.');
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _StudentService
                    .remove(_invalidIds[i])
                    .then(_onSuccess,_onError);
            }
        })

        it('should try to remove, but the server return error', function()
        {
            var _id = 'a123';
            _httpMock.expectPUT(WEBSERVICE + '/' + _id).respond(500, {error: true});

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error.error).toBeTruthy();
            }

            _StudentService
                .remove(_id)
                .then(_onSuccess,_onError);
        })

        it('should remove the student correctly', function()
        {
            var _id = 'a123';
            _httpMock.expectPUT(WEBSERVICE + '/' + _id).respond(200);

            var _onSuccess = function()
            {
                expect(false).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _StudentService
                .remove(_id)
                .then(_onSuccess,_onError);
        })
    })

    describe('getNamesInClazz', function()
    {
        it('should reject with an error, clazz is not valid', function()
        {
            var _invalidClazzes = helper.invalidStrings();

            var _onSuccess = function(names)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível buscar os alunos por turma, pois o nome passado não é válido.');
            }

            for (var i = 0; i < _invalidClazzes.length; i++)
            {

                _StudentService
                    .getNamesInClazz(_invalidClazzes[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should make the request correctly, but server returns error', function()
        {
            var _clazz = 'turma1';

            _httpMock.expectGET(WEBSERVICE + '/name/' + _clazz).respond(500, 'mensagem de erro');

            var _onSuccess = function(nomes)
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toEqual('mensagem de erro');
            }

            _StudentService
                .getNamesInClazz(_clazz)
                .then(_onSuccess, _onError);

        })

        it('should make the request correctly - empty response from server', function()
        {
            var _clazz = 'turma1';

            _httpMock.expectGET(WEBSERVICE + '/name/' + _clazz).respond([]);

            var _onSuccess = function(nomes)
            {
                expect(nomes).toEqual([]);
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _StudentService
                .getNamesInClazz(_clazz)
                .then(_onSuccess, _onError);

        })

        it('should make the request correctly', function()
        {
            var _clazz = 'turma1';
            var _response = [{name: 'João'}, {name: 'Maria'}];

            _httpMock.expectGET(WEBSERVICE + '/name/' + _clazz).respond(_response);

            var _onSuccess = function(nomes)
            {
                expect(nomes.length).toEqual(2);
                expect(nomes[0].wasInClass).toBeTruthy();
                expect(nomes[1].wasInClass).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(true).toBeFalsy();
            }

            _StudentService
                .getNamesInClazz(_clazz)
                .then(_onSuccess, _onError);

        })
    })
})