"use strict";

describe('ClazzService', function()
{
    var _ClazzService, _httpMock;
    var WEBSERVICE = '/api/protected/clazz';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _ClazzService = $injector.get('ClazzService');
    }))

    describe('getAll', function()
    {
        it('should get all the info from the server - returns null', function()
        {
            _httpMock.expectGET(WEBSERVICE).respond();

            var _onSuccess = function(clazzes)
            {
                expect(clazzes).toEqual([]);
            }

            _ClazzService
                .getAll()
                .then(_onSuccess);
        })

        it('should get all the info from the server - returns filled array', function()
        {
            var _response = [{name: 'Clazz1', time: '23:00:00'}];

            _httpMock.expectGET(WEBSERVICE).respond(_response);

            var _onSuccess = function(clazzes)
            {
                expect(clazzes).toBeDefined();
                expect(clazzes[0].name).toEqual(_response[0].name);
                expect(clazzes[0].time).toEqual(_response[0].time);
            }

            _ClazzService
                .getAll()
                .then(_onSuccess);
        })
    })

    describe('getAllClazzesProp', function()
    {
        it('should reject with an error - prop no a valid string', function()
        {
            var _invalidProps = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível buscas as classes pela informação passada. A mesma não é uma string válida.');
            }

            for (var i = 0; i < _invalidProps.length; i++)
            {
                _ClazzService
                    .getAllClazzesProp(_invalidProps[i])
                    .then(_onError);
            }
        })

        it('should make the request - but the server returns an error', function()
        {
            var _prop = 'prop';
            _httpMock.expectGET(WEBSERVICE + '/prop').respond(500);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _ClazzService
                .getAllClazzesProp(_prop)
                .then(_onSuccess, _onError);
        })

        it('should make the request - but the server returns an error', function()
        {
            var _prop = 'name';
            var _response = [{name: 'name1'}, {name: 'name2'}];

            _httpMock.expectGET(WEBSERVICE + '/name').respond(_response);

            var _onSuccess = function(clazzes)
            {
                expect(clazzes).toBeDefined();
                expect(clazzes[0].name).toEqual('name1');
                expect(clazzes[1].name).toEqual('name2');
            }

            var _onError = function()
            {
                expect(false).toBeTruthy();
            }

            _ClazzService
                .getAllClazzesProp(_prop)
                .then(_onSuccess, _onError);
        })
    })

    describe('get', function()
    {
        it('should reject with an error - id is invalid', function()
        {
            var _invalidIds = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não é possível buscar as informações específicas desta turma. Id inválido.');
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _ClazzService
                    .get(_invalidIds[i])
                    .then(undefined, _onError);
            }
        })

        it('should request the info, but the server returns an error', function()
        {
            var _id = 'a123';
            _httpMock.expectGET(WEBSERVICE + '/' + _id).respond(500);

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _ClazzService
                .get(_id)
                .then(undefined, _onError);
        })

        it('should request the info correctly', function()
        {
            var _id = 'a123';
            var _response = {name: 'a', time: '00:00:00'};
            _httpMock.expectGET(WEBSERVICE + '/' + _id).respond(_response);

            var _onSuccess = function(clazz)
            {
                expect(clazz).toBeDefined();
                expect(clazz.name).toEqual('a');
                expect(clazz.time).toEqual('00:00:00');
            }

            _ClazzService
                .get(_id)
                .then(_onSuccess);
        })
    })

    describe('save', function()
    {
        it('should throw an error - object is not valid', function()
        {
            var _invalidClazz = helper.invalidObjects();

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não foi possível registrar esta turma. Inválida.');
            }

            for (var i = 0; i < _invalidClazz.length; i++)
            {
                _ClazzService
                    .save(_invalidClazz[i])
                    .then(_onSuccess, _onError);
            }
        })

        it('should make the post, server returns error - 500', function()
        {
            var _clazz = {name: 'name', time: '22:33:44'};
            _httpMock.expectPOST(WEBSERVICE, _clazz).respond(500);

            var _onSuccess = function()
            {
                expect(false).toBeTruthy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
            }

            _ClazzService
                .save(_clazz)
                .then(_onSuccess, _onError);
        })

        it('should make the post correctly', function()
        {
            var _clazz = {name: 'name', time: '22:33:44'};
            _httpMock.expectPOST(WEBSERVICE, _clazz).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeTruthy();
            }

            var _onError = function()
            {
                expect(false).toBeTruthy();
            }

            _ClazzService
                .save(_clazz)
                .then(_onSuccess, _onError);
        })
    })

    describe('update', function()
    {
        it('should throw an error - object invalid', function()
        {
            var _invalidClazzes = helper.invalidObjects();

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não foi possível editar esta turma. Turma inválida.');
            }

            for (var i = 0; i < _invalidClazzes.length; i++)
            {
                _ClazzService
                    .update(_invalidClazzes[i])
                    .then(undefined, _onError);
            }
        })

        it('should throw an error - id is not valid', function()
        {
            var _invalidIds = helper.invalidStrings();
            var _clazz = {name: 'a123', time: '00:00:00'};

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não foi possível editar esta turma. Id inválido.');
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _ClazzService
                    .update(_invalidIds[i], _clazz)
                    .then(undefined, _onError);
            }
        })

        it('should try update the clazz - server returns error', function()
        {
            var _id = 'idHere';
            var _clazz = {name: 'a123', time: '00:00:00'};

            _httpMock.expectPUT(WEBSERVICE + '/' + _id, _clazz).respond(500);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _ClazzService
                .update(_id, _clazz)
                .then(_onSuccess, _onError);
        })

        it('should update the clazz correctly', function()
        {
            var _id = 'idHere';
            var _clazz = {name: 'a123', time: '00:00:00'};

            _httpMock.expectPUT(WEBSERVICE + '/' + _id, _clazz).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _ClazzService
                .update(_id, _clazz)
                .then(_onSuccess, _onError);
        })
    })

    describe('remove', function()
    {
        it('should throw an error - id is not valid', function()
        {
            var _invalidIds = helper.invalidStrings();

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não foi possível deletar esta turma. Id inválido.');
            }

            for (var i = 0; i < _invalidIds.length; i++)
            {
                _ClazzService
                    .remove(_invalidIds[i])
                    .then(undefined, _onError);
            }
        })

        it('should try update the clazz - server returns error', function()
        {
            var _id = 'idHere';

            _httpMock.expectDELETE(WEBSERVICE + '/' + _id).respond(500);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _ClazzService
                .remove(_id)
                .then(_onSuccess, _onError);
        })

        it('should update the clazz correctly', function()
        {
            var _id = 'idHere';

            _httpMock.expectDELETE(WEBSERVICE + '/' + _id).respond(200);

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function()
            {
                expect(true).toBeTruthy();
            }

            _ClazzService
                .remove(_id)
                .then(_onSuccess, _onError);
        })
    })
})