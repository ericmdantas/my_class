"use strict";

describe('TEACHERSCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/getTeachers').respond();
        httpMock.when('DELETE', '/api/deleteTeacher').respond();
    }))

    describe('checks elements creation', function()
    {
        it('checks if the controller was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect('TeachersController').toBeDefined();
        }))

        it('checks if the pageConfig service was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }))

        it('checks if the scope.professores was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.professores).toBeDefined();
            expect(typeof scope.professores).toBe('object');
        }))

        it('checks if the scope.novoProfessor was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.novoProfessor).toBeDefined();
            expect(typeof scope.professores).toBe('object');
        }))

        it('checks if the scope.professorEscolhido was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.professorEscolhido).toBeDefined();
            expect(typeof scope.professorEscolhido).toBe('object');
        }))

        it('checks if the scope.isLoadingVisible was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.isLoadingVisible).toBeDefined();
            expect(typeof scope.isLoadingVisible).toBe('object');
        }))

        it('checks if the scope.isLoadingVisible.modal was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.isLoadingVisible.modal).toBeDefined();
            expect(typeof scope.isLoadingVisible.modal).toBe('boolean');
        }))

        it('checks if the scope.openModalToRegisterTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.openModalToRegisterTeacher).toBeDefined();
            expect(typeof scope.openModalToRegisterTeacher).toBe('function');
        }))

        it('checks if the scope.openModalToDeleteTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.openModalToDeleteTeacher).toBeDefined();
            expect(typeof scope.openModalToDeleteTeacher).toBe('function');
        }))

        it('checks if the scope.openModalToDeleteTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.deleteTeacher).toBeDefined();
            expect(typeof scope.deleteTeacher).toBe('function');
        }))

        it('checks if the scope.registerNewTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.registerNewTeacher).toBeDefined();
            expect(typeof scope.registerNewTeacher).toBe('function');
        }))
    })

    describe('checks http.get', function()
    {
        it('checks if the get is being used - respond nothing', inject(function($controller)
        {
            httpMock.expectGET('/api/getTeachers').respond({});
            $controller('TeachersController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used - respond with resultado only', inject(function($controller)
        {
            httpMock.expectGET('/api/getTeachers').respond({resultado: []});
            $controller('TeachersController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            httpMock.expectGET('/api/getTeachers').respond({resultado: ['somebody here', 'somebody else in here']});
            httpMock.flush();
            expect(scope.professores.length).toBe(2);
        }))
    })

    describe('checks http.post', function()
    {
        it('tries to delete a teacher with wrong id', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(function(){scope.deleteTeacher()}).toThrow(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
            expect(function(){scope.deleteTeacher(null)}).toThrow(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
            expect(function(){scope.deleteTeacher(undefined)}).toThrow(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
            expect(function(){scope.deleteTeacher({})}).toThrow(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
        }))

        it('checks if the deletion is working', inject(function($controller)
        {
            httpMock.expectGET('/api/getTeachers').respond({resultado: {teachers: []}});
            httpMock.expectDELETE('/api/deleteTeacher/123').respond({});
            $controller('TeachersController', {$scope: scope});

            var professor = {nome: "fulano", _id: 123};

            scope.deleteTeacher(professor._id);
            httpMock.flush();
        }))
    })
})