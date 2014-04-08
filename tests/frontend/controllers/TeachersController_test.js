"use strict";

describe('TEACHERSCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/teachers').respond();
        httpMock.when('POST', '/api/teachers').respond();
        httpMock.when('PUT', '/api/teachers/123').respond();
        httpMock.when('DELETE', '/api/teachers').respond();
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

        it('checks if modals are ready to be opened - openModalToDeleteTeacher', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.openModalToDeleteTeacher).toBeDefined();
            expect(typeof scope.openModalToDeleteTeacher).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterTeacher', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            expect(scope.openModalToRegisterTeacher).toBeDefined();
            expect(typeof scope.openModalToRegisterTeacher).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditTeacher', inject(function($controller)
        {
            scope.professorEscolhido = {};

            $controller('TeachersController', {$scope: scope});
            expect(scope.openModalToEditTeacher).toBeDefined();
            expect(typeof scope.openModalToEditTeacher).toEqual('function');
        }))
    })

    describe('checks if the edition to open the modal is working', function()
    {
        it('checks if a empty object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});

            var professorEditado = {};

            scope.openModalToEditTeacher(professorEditado);

            expect(scope.professorEscolhido).toEqual(professorEditado);
        }))

        it('checks if a filled object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});

            var professorEditado = {name: "Fulano", salary: 123};

            scope.openModalToEditTeacher(professorEditado);

            expect(scope.professorEscolhido).toEqual(professorEditado);
        }))
    })

    describe('checks if the deletion to open the modal is working', function()
    {
        it('checks if a empty object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});

            var professorEditado = {};

            scope.openModalToEditTeacher(professorEditado);

            expect(scope.professorEscolhido).toEqual(professorEditado);
        }))

        it('checks if a empty object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});

            var professorEditado = {_id: '123a'};

            scope.openModalToEditTeacher(professorEditado);

            expect(scope.professorEscolhido).toEqual(professorEditado);
        }))
    })

    describe('GET /api/teachers', function()
    {
        it('checks if the get is being used - respond nothing', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers').respond({});
            $controller('TeachersController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used - respond with resultado only', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers').respond({resultado: []});
            $controller('TeachersController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers').respond({resultado: ['somebody here', 'somebody else in here']});
            $controller('TeachersController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores.length).toBe(2);
        }))
    })

    describe('POST /api/teachers', function()
    {
        it('try to post a teacher without any info - throws error', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});

            var wrongParams = [, undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.registerNewTeacher(wrongParams[i])}).toThrow(new Error('Não é possível cadastrar um professor sem informações.'));
            }
        }))

        it('registers a ok teacher', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            var teacher = {name: 'professor', salary: 123};
            scope.registerNewTeacher(teacher);
            httpMock.flush();
        }))
    })

    describe('PUT /api/teachers/:id', function()
    {
        it('try to edit a teacher without any info', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});

            var wrongParams = [, undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.editTeacher(wrongParams[i])}).toThrow(new Error('Não é possível editar um professor sem informações.'));
            }
        }))

        it('try to edit a teacher without any id', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            var teacher = {name: 'Professor', salary: 123};
            expect(function(){scope.editTeacher(teacher)}).toThrow(new Error('Não é possível editar um professor sem informações.'));
        }))

        it('edit a teacher successfully', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});
            var teacher = {_id: 123, name: 'Professor', salary: 1};
            scope.editTeacher(teacher);
            httpMock.flush();
        }))
    })

    describe('DELETE /api/teachers/:id', function()
    {
        it('tries to delete a teacher with wrong id', inject(function($controller)
        {
            $controller('TeachersController', {$scope: scope});

            var wrongParams = [, undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.deleteTeacher(wrongParams[i])}).toThrow(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
            }
        }))

        it('checks if the deletion is working', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers').respond({resultado: {teachers: []}});
            httpMock.expectDELETE('/api/teachers/123').respond({});
            $controller('TeachersController', {$scope: scope});

            var professor = {nome: "fulano", _id: "123"};

            scope.deleteTeacher(professor._id);
            httpMock.flush();
        }))
    })
})