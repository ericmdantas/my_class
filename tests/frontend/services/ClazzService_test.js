"use strict";

describe('ClazzService', function()
{
    var ClazzService, httpMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        ClazzService = $injector.get('ClazzService');
    }))

    describe('check elements creation', function()
    {
        it('checks if getClazzes was created', function()
        {
            expect(ClazzService.getClazzes).toBeDefined();
            expect(typeof ClazzService.getClazzes).toEqual('function');
        })

        it('checks if getClazzesNames was created', function()
        {
            expect(ClazzService.getClazzesNames).toBeDefined();
            expect(typeof ClazzService.getClazzesNames).toEqual('function');
        })

        it('checks if registerClazz was created', function()
        {
            expect(ClazzService.registerClazz).toBeDefined();
            expect(typeof ClazzService.registerClazz).toEqual('function');
        })

        it('checks if editClazz was created', function()
        {
            expect(ClazzService.editClazz).toBeDefined();
            expect(typeof ClazzService.editClazz).toEqual('function');
        })

        it('checks if deleteClazz was created', function()
        {
            expect(ClazzService.deleteClazz).toBeDefined();
            expect(typeof ClazzService.deleteClazz).toEqual('function');
        })
    })

    describe('GET /api/classes', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/classes').respond();
            ClazzService.getClazzes();
            httpMock.flush();
        })
    })

    describe('GET /api/classes/name', function()
    {
        it('shjould fetch request correctly', function()
        {
            httpMock.expectGET('/api/classes/name').respond();
            ClazzService.getClazzesNames();
            httpMock.flush();
        })
    })

    describe('POST /api/classes', function()
    {
        it('should throw error - wrong clazz param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){ClazzService.registerClazz(_wrongParams[i])})
                                              .toThrow(new Error('Não é possível cadastrar a turma. O paramêtro foi passado de forma errada.'));
            }
        })

        it('should register clazz correctly', function()
        {
            httpMock.expectPOST('/api/classes').respond();
            var _clazz = {name: "turma1"};

            ClazzService.registerClazz(_clazz);

            httpMock.flush();
        })
    })

    describe('PUT /api/classes/a123', function()
    {
        it('should throw error - wrong clazz param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];
            var _id = 'a123';

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){ClazzService.editClazz(_id, _wrongParams[i])})
                                              .toThrow(new Error('Não é possível editar a turma. O paramêtro TURMA foi passado de forma errada.'));
            }
        })

        it('should throw error - wrong id param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];
            var _clazz = {name: 'turma1'};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){ClazzService.editClazz(_wrongParams[i], _clazz)})
                    .toThrow(new Error('Não é possível editar a turma. O paramêtro ID foi passado de forma errada.'));
            }
        })

        it('should edit clazz correctly', function()
        {
            httpMock.expectPUT('/api/classes/a123').respond();
            var _clazz = {name: "turma1"};
            var _id = 'a123';

            ClazzService.editClazz(_id, _clazz);
            httpMock.flush();
        })
    })

    describe('DELETE /api/classes/a123', function()
    {
        it('should throw error - wrong id param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){ClazzService.deleteClazz(_wrongParams[i])})
                    .toThrow(new Error('Não é possível deletar a turma. O paramêtro ID foi passado de forma errada.'));
            }
        })

        it('should delete clazz correctly', function()
        {
            httpMock.expectDELETE('/api/classes/a123').respond();
            var _id = 'a123';

            ClazzService.deleteClazz(_id);
            httpMock.flush();
        })
    })
})