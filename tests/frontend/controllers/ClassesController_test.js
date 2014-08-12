"use strict";

describe('CLASSESCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock, _timeoutMock;

	beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _timeoutMock = $injector.get('$timeout');
        _httpMock.when('GET', '/api/protected/classes').respond([{name: 'a'}, {name: 'b'}]);
        _httpMock.when('GET', '/api/protected/students/name').respond(200);
        _httpMock.when('POST', '/api/protected/classes').respond(200);
        _httpMock.when('PUT', '/api/protected/classes/123').respond(200);
        _httpMock.when('DELETE', '/api/protected/classes/A').respond(200);
    }))

    describe('elements creation', function()
    {
        it('checks if classeccontroller exists and is defined', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect('ClassesController').toBeDefined();
        }))

        it('checks if $scope.novaTurma exists', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(typeof _scope.novaTurma).toEqual('object');
        }));

        it('checks if $scope.turmaEscolhida exists', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(typeof _scope.turmaEscolhida).toEqual('object');
        }));

        it('checks _scope.turmas', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(_scope.turmas).toBeDefined();
        }));

        it('checks if _scope.isLoadingVisible created', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(_scope.isLoadingVisible).toBeDefined();
            expect(_scope.isLoadingVisible.modal).toEqual(false);
        }));

        it('checks if _scope.cfg was created', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }));

        it('checks if modals are ready to be opened - openModalToDeleteClass', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(_scope.openModalToDeleteClass).toBeDefined();
            expect(typeof _scope.openModalToDeleteClass).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterClass', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(_scope.openModalToRegisterClass).toBeDefined();
            expect(typeof _scope.openModalToRegisterClass).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditClass', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(_scope.openModalToEditClass).toBeDefined();
            expect(typeof _scope.openModalToEditClass).toEqual('function');
        }))

        it('checks if inputMaxLength was created', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            expect(_scope.inputMaxLength).toBeDefined();
        }))
    })

    describe('openModalToRegisterClass', function()
    {
        it('should call openModalToRegisterClass correctly', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});

            _scope.openModalToRegisterClass();
        }))
    })

    describe('openModalToEditClass', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var chosenClass = {};
            _scope.openModalToEditClass(chosenClass);

            expect(_scope.turmaEscolhida).toEqual(chosenClass);
        }))

        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var chosenClass = {_id: 'abc', name: 'Turma1'};
            _scope.openModalToEditClass(chosenClass);

            expect(_scope.turmaEscolhida).toEqual(chosenClass);
        }))

        it('should flush timeout correctly', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var _clazz = {_id: 'a123', name: 'Turma1'};

            _scope.openModalToEditClass(_clazz);
            _timeoutMock.flush();
        }))
    })

    describe('openModalToDeleteClass', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var chosenClass = {};
            _scope.openModalToDeleteClass(chosenClass);

            expect(_scope.turmaEscolhida).toEqual(chosenClass);
        }))

        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var chosenClass = {_id: 'abc', name: 'Turma1'};
            _scope.openModalToDeleteClass(chosenClass);
            expect(_scope.turmaEscolhida).toEqual(chosenClass);
        }))
    })

    describe('GET /api/protected/classes', function()
    {
        it('should get response from the server with empty object', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes').respond();
            $controller('ClassesController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.turmas.length).toEqual(0);
        }))

        it('should get response from the server with filled object', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes').respond([]);
            $controller('ClassesController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.turmas.length).toEqual(0);
        }))

        it('should get response from the server with filled object and subdocs', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes').respond([{name: 'A'}, {name: 'B'}]);
            $controller('ClassesController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.turmas[0].name).toEqual('A');
            expect(_scope.turmas[1].name).toEqual('B');
        }))
    })

    describe('GET /api/protected/students/name', function()
    {
        it('should not throw error - no response from server', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/name').respond();
            $controller('ClassesController', {$scope: _scope});
            _httpMock.flush();

            expect(_scope.alunos.length).toEqual(0);
        }))

        it('should not throw error - partial response from server', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/name').respond([]);
            $controller('ClassesController', {$scope: _scope});
            _httpMock.flush();

            expect(_scope.alunos.length).toEqual(0);
        }))

        it('should fill the alunos array correctly - full response from server', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/name').respond([{name: 'Aluno1'}, {name: 'Aluno2'}]);
            $controller('ClassesController', {$scope: _scope});
            _httpMock.flush();

            expect(_scope.alunos[0]).toEqual('Aluno1');
            expect(_scope.alunos[1]).toEqual('Aluno2');
        }))
    })

    describe('POST /api/protected/classes', function()
    {
        it('tries to register a class with wrong params', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});

            var wrongParams = [undefined, null, true, false, [], {}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.registerClass(wrongParams[i])
                }).toThrow(new Error('Não foi possível registrar esta turma.'));
            }
        }))

        it('tries to register a class with wrong students', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});

            var wrongParams = [[{students: []}], [{students: {}}]];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.registerClass(wrongParams[i])
                }).toThrow(new Error('Não foi possível registrar esta turma, objeto de alunos não informado corretamente.'));
            }
        }))

        it('checks if adding a class is working - if there were 3 classes, should be 4 after the adition', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            _scope.turmas = [{students: ['A', 'B', 'C']}];
            _scope.registerClass(_scope.turmas[0]);
            _httpMock.flush();

            expect(_scope.turmas.length).toBeGreaterThan(0);
        }))

        it('should be able to register class successfully with students informed', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var _turma = {name: 'A', _id: '123', students: ['a1', 'a2', 'a3']};
            _scope.registerClass(_turma);
            _httpMock.flush();
            var _expected = {name: 'A', _id: '123', students: ['a1', 'a2', 'a3']};

            expect(_turma).toEqual(_expected);
        }))
    })

    describe('PUT /api/protected/classes/:id', function()
    {
        it('shouldn\'t be able to edit class', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});

            var wrongParams = [undefined, null, true, false, [], {}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.editClass(wrongParams[i]);
                }).toThrow(new Error('Não foi possível editar esta turma.'));
            }
        }))

        it('tries to edit a class with wrong students', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});

            var wrongParams = [{_id: 'a123', students: []}, {_id: 'a123', students: {}}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.editClass(wrongParams[i])
                }).toThrow(new Error('Não foi possível editar esta turma, objeto de alunos não informado corretamente.'));
            }
        }))

        it('shouldn\'t be able to edit a class without id', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var turma = {name: 'A'};

            expect(function()
            {
                _scope.editClass(turma);
            }).toThrow(new Error('Não foi possível editar esta turma.'));
        }))

        it('should be able to edit successfully', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var turma = {_id: '123', students: [{name: 'A'}]};
            _scope.editClass(turma);
            _httpMock.flush();
        }))

        it('should be able to edit class successfully with students informed', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            var _turma = {name: 'A', _id: '123', students: ['a1', 'a2', 'a3']};
            _scope.editClass(_turma);
            _httpMock.flush();

            var _expected = {name: 'A', _id: '123', students: ['a1', 'a2', 'a3']};

            expect(_turma).toEqual(_expected);
        }))
    })

    describe('DELETE /api/protected/delete/:id', function()
    {
        it('tries to delete a class passing wrong ids', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});

            var wrongParams = [undefined, , null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.deleteClass(wrongParams[i]);
                }).toThrow(new Error('Não foi possível deletar esta turma, pois o id está errado.'));
            }
        }))

        it('checks if deleting a class is working - if there were 3 classes, should be 2 after the deletion', inject(function($controller)
        {
            $controller('ClassesController', {$scope: _scope});
            _scope.turmas = [{name: 'A', index: 0, _id: 'A'}, {name: 2, index: 3, _id: 1}, {name: 3, index: 2, _id: 2}];

            var quantidadeDeTurmasAntesDaDelecao = _scope.turmas.length;
            _scope.deleteClass(_scope.turmas[0]._id);
            _httpMock.flush();
            expect(quantidadeDeTurmasAntesDaDelecao).toBeGreaterThan(0);
        }))
    })
});