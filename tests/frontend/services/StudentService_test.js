"use strict";

describe('StudentService', function()
{
    var StudentService, scope, httpMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        StudentService = $injector.get('StudentService');
        httpMock = $injector.get('$httpBackend');

        httpMock.when('GET', '/api/students').respond();
        httpMock.when('GET', '/api/students/name').respond();
    }))

    describe('checks elements creation', function()
    {
        it('checks if getStudents was created', function()
        {
            expect(StudentService.getStudents).toBeDefined();
            expect(typeof StudentService.getStudents).toEqual("function");
        })

        it('checks if getStudentsNames was created', function()
        {
            expect(StudentService.getStudentsNames).toBeDefined();
            expect(typeof StudentService.getStudentsNames).toEqual("function");
        })

        it('checks if getStudentsNamesInClass was created', function()
        {
            expect(StudentService.getStudentsNamesInClass).toBeDefined();
            expect(typeof StudentService.getStudentsNamesInClass).toEqual("function");
        })

        it('checks if registerStudent was creted', function()
        {
            expect(StudentService.registerStudent).toBeDefined();
            expect(typeof StudentService.registerStudent).toEqual("function");
        })

        it('checks if editStudent was creted', function()
        {
            expect(StudentService.editStudent).toBeDefined();
            expect(typeof StudentService.editStudent).toEqual("function");
        })

        it('checks if deleteStudent was creted', function()
        {
            expect(StudentService.deleteStudent).toBeDefined();
            expect(typeof StudentService.deleteStudent).toEqual("function");
        })
    })

    describe('GET /api/students', function()
    {
        it('should fetch request correctly', function()
        {
            StudentService.getStudents();
            httpMock.flush();
        })
    })

    describe('GET /api/students/name', function()
    {
        it('should fetch request correctly', function()
        {
            StudentService.getStudentsNames();
            httpMock.flush();
        })
    })

    describe('GET /api/students/name/:clazz', function()
    {
        it('should throw exception - wrong params', function()
        {
            var wrongParams = [{}, '', [], function(){}, true, false, 1];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){StudentService.getStudentsNamesInClass(wrongParams[i])})
                                  .toThrow(new Error('Não é possível buscar os nomes dos alunos. Nome da turma não foi informado corretamente.'));
            }
        })

        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/students/name/turma1').respond();
            StudentService.getStudentsNamesInClass('turma1');
            httpMock.flush();
        })
    })

    describe('POST /api/students', function()
    {
        it('should throw exception - wrong params', function()
        {
            var wrongParams = [{}, '', [], function(){}, true, false, 1];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){StudentService.registerStudent(wrongParams[i])})
                                  .toThrow(new Error('Não é possível cadastrar o aluno. O aluno informado não é válido.'));
            }
        })

        it('should fetch request correctly', function()
        {
            httpMock.expectPOST('/api/students').respond();
            StudentService.registerStudent({name: "eric"});
            httpMock.flush();
        })
    })

    describe('PUT /api/students', function()
    {
        it('should throw exception - wrong student param', function()
        {
            var wrongParams = [{}, '', [], function(){}, true, false, 1];
            var id = 'a123';


            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){StudentService.editStudent(id, wrongParams[i])})
                                .toThrow(new Error('Não é possível editar o aluno. O aluno informado não é válido.'));
            }
        })

        it('should throw exception - wrong id param', function()
        {
            var _wrongParams = [{}, '', [], function(){}, true, false, 1];
            var _aluno = {name: "eric"};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){StudentService.editStudent(_wrongParams[i], _aluno)})
                                    .toThrow(new Error('Não é possível editar o aluno. O id do aluno informado não é válido.'));
            }
        })

        it('should fetch request correctly', function()
        {
            httpMock.expectPUT('/api/students/a123').respond();
            var _aluno = {name: "eric"};
            var _id = 'a123';

            StudentService.editStudent(_id, _aluno);
            httpMock.flush();
        })
    })

    describe('DELETE /api/students', function()
    {
        it('should throw exception - wrong id param', function()
        {
            var _wrongParams = [{}, '', [], function(){}, true, false, 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){StudentService.deleteStudent(_wrongParams[i])})
                                   .toThrow(new Error('Não é possível deletar o aluno. O id do aluno informado não é válido.'));
            }
        })

        it('should fetch the request correctly', function()
        {
            httpMock.expectDELETE('/api/students/a123').respond();
            var _id = 'a123';

            StudentService.deleteStudent(_id);
            httpMock.flush();
        })
    })
})