"use strict";

describe('TEACHERSCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock, _lib, _Teacher;
    var NOME_CONTROLLER = 'TeachersController';
    var WEBSERVICE = '/api/protected/teachers';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _lib = $injector.get('lib');
        _Teacher = $injector.get('Teacher');
        _httpMock = $injector.get('$httpBackend');
        _httpMock.when('GET', WEBSERVICE).respond();
        _httpMock.when('POST', WEBSERVICE).respond();
        _httpMock.when('PUT', WEBSERVICE + '/123').respond();
        _httpMock.when('DELETE', WEBSERVICE).respond();
    }))

    describe('checks elements creation', function()
    {
        it('checks if the controller was created', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            expect(NOME_CONTROLLER).toBeDefined();
        }))

        it('checks if the pageConfig service was created', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }))

        it('checks if the _scope.professores was created', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toBe('object');
        }))

        it('checks if the _scope.professor was created', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            expect(_scope.professor instanceof _Teacher).toBeTruthy();
        }))

        it('checks if the _scope.deleteTeacher was created', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            expect(_scope.deleteTeacher).toBeDefined();
            expect(typeof _scope.deleteTeacher).toBe('function');
        }))

        it('checks if the _scope.registerNewTeacher was created', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            expect(_scope.registerNewTeacher).toBeDefined();
            expect(typeof _scope.registerNewTeacher).toBe('function');
        }))

        it('checks if setTeacher is working correctly', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});

            var _obj = {a: 1};
            _scope.setTeacher(_obj);

            expect(_scope.professor.a).toEqual(_obj.a);
        }))

        it('checks if inputMaxLength was created', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
        }))
    })

    describe('resetTeacher', function()
    {
        it('should be an instance of Teacher', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});

            _scope.professor = {a: '1'};
            _scope.resetTeacher();
            expect(_scope.professor instanceof _Teacher).toBeTruthy();
        }))
    })

    describe('GET /api/protected/teachers', function()
    {
        it('checks if the get is being used - respond nothing', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond([]);
            $controller(NOME_CONTROLLER, {$scope: _scope});
            _httpMock.flush();

            expect(_scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used - respond with resultado only', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond([]);
            $controller(NOME_CONTROLLER, {$scope: _scope});
            _httpMock.flush();

            expect(_scope.professores.length).toBe(0);
        }))

        it('checks if the get is being used', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond(['somebody here', 'somebody else in here']);
            $controller(NOME_CONTROLLER, {$scope: _scope});
            _httpMock.flush();

            expect(_scope.professores.length).toBe(2);
        }))
    })

    describe('POST /api/protected/teachers', function()
    {
        it('try to post a teacher without any info - throws error', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});

            var wrongParams = helper.invalidObjects();

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.registerNewTeacher(wrongParams[i])
                }).not.toThrow(new Error('Não é possível cadastrar um professor sem informações.'));
            }
        }))

        it('registers teacher correctly', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            var teacher = {name: 'professor', salary: 123, birthDate: '26/06/89'};

            _scope.registerNewTeacher(teacher);

            _httpMock.flush();
        }))
    })

    describe('PUT /api/protected/teachers/:id', function()
    {
        it('try to edit a teacher without any info', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});

            var wrongParams = helper.invalidObjects();

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.editTeacher(wrongParams[i])
                }).not.toThrow(new Error('Não é possível editar um professor sem informações.'));
            }
        }))

        it('try to edit a teacher without any id', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            var teacher = {name: 'Professor', salary: 123, birthDate: '26/06/89', address: 'Abc'};

            expect(function()
            {
                _scope.editTeacher(teacher)
            }).not.toThrow(new Error('Não é possível editar um professor sem id.'));
        }))

        it('edit a teacher successfully', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});
            var teacher = {_id: "123", name: 'Professor', salary: 1, address: 'ABC', birthDate: '26/06/89'};

            _scope.editTeacher(teacher);
            _httpMock.flush();
        }))
    })

    describe('DELETE /api/protected/teachers/:id', function()
    {
        it('tries to delete a teacher with wrong id', inject(function($controller)
        {
            $controller(NOME_CONTROLLER, {$scope: _scope});

            var wrongParams = helper.invalidStrings();

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.deleteTeacher(wrongParams[i])
                }).not.toThrow(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
            }
        }))

        it('checks if the deletion is working', inject(function($controller)
        {
            _httpMock.expectGET(WEBSERVICE).respond([]);
            _httpMock.expectDELETE(WEBSERVICE + '/123').respond({});
            $controller(NOME_CONTROLLER, {$scope: _scope});

            var professor = {nome: "fulano", _id: "123"};

            _scope.deleteTeacher(professor._id);
            _httpMock.flush();
        }))
    })
})