"use strict";

describe('TEACHERSCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _httpMock.when('GET', '/api/teachers').respond();
        _httpMock.when('POST', '/api/teachers').respond();
        _httpMock.when('PUT', '/api/teachers/123').respond();
        _httpMock.when('DELETE', '/api/teachers').respond();
    }))

    describe('checks elements creation', function()
    {
        it('checks if the controller was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect('TeachersController').toBeDefined();
        }))

        it('checks if the pageConfig service was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }))

        it('checks if the _scope.professores was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toBe('object');
        }))

        it('checks if the _scope.novoProfessor was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.novoProfessor).toBeDefined();
            expect(typeof _scope.professores).toBe('object');
        }))

        it('checks if the _scope.professorEscolhido was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.professorEscolhido).toBeDefined();
            expect(typeof _scope.professorEscolhido).toBe('object');
        }))

        it('checks if the _scope.isLoadingVisible was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.isLoadingVisible).toBeDefined();
            expect(typeof _scope.isLoadingVisible).toBe('object');
        }))

        it('checks if the _scope.isLoadingVisible.modal was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.isLoadingVisible.modal).toBeDefined();
            expect(typeof _scope.isLoadingVisible.modal).toBe('boolean');
        }))

        it('checks if the _scope.openModalToRegisterTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.openModalToRegisterTeacher).toBeDefined();
            expect(typeof _scope.openModalToRegisterTeacher).toBe('function');
        }))

        it('checks if the _scope.openModalToDeleteTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.openModalToDeleteTeacher).toBeDefined();
            expect(typeof _scope.openModalToDeleteTeacher).toBe('function');
        }))

        it('checks if the _scope.openModalToDeleteTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.deleteTeacher).toBeDefined();
            expect(typeof _scope.deleteTeacher).toBe('function');
        }))

        it('checks if the _scope.registerNewTeacher was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.registerNewTeacher).toBeDefined();
            expect(typeof _scope.registerNewTeacher).toBe('function');
        }))

        it('checks if modals are ready to be opened - openModalToDeleteTeacher', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.openModalToDeleteTeacher).toBeDefined();
            expect(typeof _scope.openModalToDeleteTeacher).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterTeacher', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.openModalToRegisterTeacher).toBeDefined();
            expect(typeof _scope.openModalToRegisterTeacher).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditTeacher', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            expect(_scope.openModalToEditTeacher).toBeDefined();
            expect(typeof _scope.openModalToEditTeacher).toEqual('function');
        }))

        it('checks if inputMaxLength was created', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
        }))
    })

    describe('checks if the edition to open the modal is working', function()
    {
        it('checks if a empty object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            var professorEditado = {};

            _scope.openModalToEditTeacher(professorEditado);

            expect(_scope.professorEscolhido).toEqual(professorEditado);
        }))

        it('checks if a filled object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            var professorEditado = {name: "Fulano", salary: 123};

            _scope.openModalToEditTeacher(professorEditado);

            expect(_scope.professorEscolhido).toEqual(professorEditado);
        }))
    })

    describe('checks if the deletion to open the modal is working', function()
    {
        it('checks if a empty object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            var professorEditado = {};

            _scope.openModalToEditTeacher(professorEditado);

            expect(_scope.professorEscolhido).toEqual(professorEditado);
        }))

        it('checks if a empty object is clicked, the professorEscolhido object is working', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            var professorEditado = {_id: '123a'};

            _scope.openModalToEditTeacher(professorEditado);

            expect(_scope.professorEscolhido).toEqual(professorEditado);
        }))
    })

    describe('GET /api/teachers', function()
    {
        it('checks if the get is being used - respond nothing', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers').respond({});
            $controller('TeachersController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used - respond with resultado only', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers').respond({resultado: []});
            $controller('TeachersController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers').respond({resultado: ['somebody here', 'somebody else in here']});
            $controller('TeachersController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores.length).toBe(2);
        }))
    })

    describe('POST /api/teachers', function()
    {
        it('try to post a teacher without any info - throws error', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            var wrongParams = [, undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.registerNewTeacher(wrongParams[i])}).toThrow(new Error('Não é possível cadastrar um professor sem informações.'));
            }
        }))

        it('registers a ok teacher', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            var teacher = {name: 'professor', salary: 123};
            _scope.registerNewTeacher(teacher);
            _httpMock.flush();
            expect(_scope.novoProfessor).toEqual({});
        }))
    })

    describe('PUT /api/teachers/:id', function()
    {
        it('try to edit a teacher without any info', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            var wrongParams = [, undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.editTeacher(wrongParams[i])}).toThrow(new Error('Não é possível editar um professor sem informações.'));
            }
        }))

        it('try to edit a teacher without any id', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            var teacher = {name: 'Professor', salary: 123};
            expect(function(){_scope.editTeacher(teacher)}).toThrow(new Error('Não é possível editar um professor sem informações.'));
        }))

        it('edit a teacher successfully', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});
            var teacher = {_id: "123", name: 'Professor', salary: 1};
            _scope.editTeacher(teacher);
            _httpMock.flush();
            expect(_scope.professorEscolhido).toEqual({});
        }))
    })

    describe('DELETE /api/teachers/:id', function()
    {
        it('tries to delete a teacher with wrong id', inject(function($controller)
        {
            $controller('TeachersController', {$scope: _scope});

            var wrongParams = [, undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.deleteTeacher(wrongParams[i])}).toThrow(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
            }
        }))

        it('checks if the deletion is working', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers').respond({resultado: {teachers: []}});
            _httpMock.expectDELETE('/api/teachers/123').respond({});
            $controller('TeachersController', {$scope: _scope});

            var professor = {nome: "fulano", _id: "123"};

            _scope.deleteTeacher(professor._id);
            _httpMock.flush();

            expect(_scope.professorEscolhido).toEqual({});
        }))
    })
})