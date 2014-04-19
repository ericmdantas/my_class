"use strict";

describe('TeacherService', function()
{
    var httpMock, TeacherService;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        TeacherService = $injector.get('TeacherService');
    }))

    describe('checks elements creation', function()
    {
        it('checks if getTeachers was created', function()
        {
            expect(TeacherService.getTeachers).toBeDefined();
            expect(typeof TeacherService.getTeachers).toEqual('function');
        })

        it('checks if getTeachersNames was created', function()
        {
            expect(TeacherService.getTeachersNames).toBeDefined();
            expect(typeof TeacherService.getTeachersNames).toEqual('function');
        })

        it('checks if registerTeacher was created', function()
        {
            expect(TeacherService.registerTeacher).toBeDefined();
            expect(typeof TeacherService.registerTeacher).toEqual('function');
        })

        it('checks if editTeacher was created', function()
        {
            expect(TeacherService.editTeacher).toBeDefined();
            expect(typeof TeacherService.editTeacher).toEqual('function');
        })

        it('checks if deleteTeacher was created', function()
        {
            expect(TeacherService.deleteTeacher).toBeDefined();
            expect(typeof TeacherService.deleteTeacher).toEqual('function');
        })
    })

    describe('GET /api/teachers', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/teachers').respond();
            TeacherService.getTeachers();
            httpMock.flush();
        })
    })

    describe('GET /api/teachers/name', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/teachers/name').respond();
            TeacherService.getTeachersNames();
            httpMock.flush();
        })
    })

    describe('POST /api/teachers', function()
    {
        it('should throw error - wrong teacher param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){TeacherService.registerTeacher(_wrongParams[i])})
                                                .toThrow(new Error('Não é possível cadastrar o professor. Parâmetro PROFESSOR errado.'));
            }
        })

        it('should register teacher correctly', function()
        {
            httpMock.expectPOST('/api/teachers').respond();
            var _professor = {name: "professor1"};

            TeacherService.registerTeacher(_professor);
            httpMock.flush();
        })
    })

    describe('PUT /api/teachers/a123', function()
    {
        it('should throw error - wrong teacher param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];
            var _id = 'a123';

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){TeacherService.editTeacher(_id, _wrongParams[i])})
                                                .toThrow(new Error('Não é possível editar o professor. Parâmetro PROFESSOR errado.'));
            }
        })

        it('should throw error - wrong teacher param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];
            var _professor = {name: 'professor1'};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){TeacherService.editTeacher(_wrongParams[i], _professor)})
                                                .toThrow(new Error('Não é possível editar o professor. Parâmetro ID errado.'));
            }
        })

        it('should edit teacher correctly', function()
        {
            httpMock.expectPUT('/api/teachers/a123').respond();
            var _id = 'a123';
            var _professor = {name: "professor1"};

            TeacherService.editTeacher(_id, _professor);
            httpMock.flush();
        })
    })

    describe('DELETE /api/teachers/a123', function()
    {
        it('should throw error - wrong id param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){TeacherService.deleteTeacher(_wrongParams[i])})
                                                .toThrow(new Error('Não é possível deletar o professor. Parâmetro ID errado.'));
            }
        })

        it('should delete teacher correctly', function()
        {
            httpMock.expectDELETE('/api/teachers/a123').respond();
            var _id = 'a123';

            TeacherService.deleteTeacher(_id);
            httpMock.flush();
        })
    })
})