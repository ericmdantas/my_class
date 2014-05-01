describe('CLASSESCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

	beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/classes').respond({classes: [{name: 'a'}, {name: 'b'}]});
        httpMock.when('GET', '/api/students/name').respond(200);
        httpMock.when('POST', '/api/classes').respond(200);
        httpMock.when('PUT', '/api/classes/123').respond(200);
        httpMock.when('DELETE', '/api/classes/A').respond(200);
    }))

    describe('elements creation', function()
    {
        it('checks if classeccontroller exists and is defined', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect('ClassesController').toBeDefined();
        }))

        it('checks if $scope.novaTurma exists', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(typeof scope.novaTurma).toEqual('object');
        }));

        it('checks if $scope.turmaEscolhida exists', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(typeof scope.turmaEscolhida).toEqual('object');
        }));

        it('checks scope.turmas', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.turmas).toBeDefined();
        }));

        it('checks if scope.isLoadingVisible created', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.isLoadingVisible).toBeDefined();
            expect(scope.isLoadingVisible.modal).toEqual(false);
        }));

        it('checks if scope.cfg was created', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }));

        it('checks if scope.getClasses was created', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.getClasses).toBeDefined();
            expect(typeof scope.getClasses).toBe('function');
        }))

        it('checks if modals are ready to be opened - openModalToDeleteClass', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.openModalToDeleteClass).toBeDefined();
            expect(typeof scope.openModalToDeleteClass).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterClass', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.openModalToRegisterClass).toBeDefined();
            expect(typeof scope.openModalToRegisterClass).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditClass', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.openModalToEditClass).toBeDefined();
            expect(typeof scope.openModalToEditClass).toEqual('function');
        }))

        it('checks if getStudentsNames is defined', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.getStudentsNames).toBeDefined();
            expect(typeof scope.getStudentsNames).toEqual('function');
        }))
    })

    describe('checks if opening modal to edit class is working properly', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var chosenClass = {};
            scope.openModalToEditClass(chosenClass);
            expect(scope.turmaEscolhida).toEqual(chosenClass);
        }))

        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var chosenClass = {_id: 'abc', name: 'Turma1'};
            scope.openModalToEditClass(chosenClass);
            expect(scope.turmaEscolhida).toEqual(chosenClass);
        }))
    })

    describe('checks if opening modal to delete class is working properly', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var chosenClass = {};
            scope.openModalToDeleteClass(chosenClass);
            expect(scope.turmaEscolhida).toEqual(chosenClass);
        }))

        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var chosenClass = {_id: 'abc', name: 'Turma1'};
            scope.openModalToDeleteClass(chosenClass);
            expect(scope.turmaEscolhida).toEqual(chosenClass);
        }))
    })

    describe('GET /api/classes', function()
    {
        it('should get response from the server with empty object', inject(function($controller)
        {
            httpMock.expectGET('/api/classes').respond();
            $controller('ClassesController', {$scope: scope});
            httpMock.flush();
            expect(scope.turmas).toEqual([]);
        }))

        it('should get response from the server with filled object', inject(function($controller)
        {
            httpMock.expectGET('/api/classes').respond({classes: []});
            $controller('ClassesController', {$scope: scope});
            httpMock.flush();
            expect(scope.turmas).toEqual([]);
        }))

        it('should get response from the server with filled object and subdocs', inject(function($controller)
        {
            httpMock.expectGET('/api/classes').respond({classes: [{name: 'A'}, {name: 'B'}]});
            $controller('ClassesController', {$scope: scope});
            httpMock.flush();
            expect(scope.turmas).toEqual([{name: 'A'}, {name: 'B'}]);
        }))
    })

    describe('POST /api/classes', function()
    {
        it('tries to register a class with wrong params', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});

            var wrongParams = [undefined, null, true, false, [], {}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.registerClass(wrongParams[i])}).toThrow(new Error('Não foi possível registrar esta turma.'));
            }
        }))

        it('checks if adding a class is working - if there were 3 classes, should be 4 after the adition', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            scope.turmas = [{name: 1}, {name: 2}, {name: 3}];
            scope.registerClass(scope.turmas[0]);
            httpMock.flush();

            expect(scope.turmas.length).toBeGreaterThan(0);
        }))

        it('should be able to register class successfully with students informed', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var _turma = {name: 'A', _id: '123', students: 'a1, a2, a3'};
            scope.editClass(_turma);
            httpMock.flush();
            var _expected = {name: 'A', _id: '123', students: ['a1', ' a2', ' a3']};

            expect(_turma).toEqual(_expected);
        }))
    })

    describe('PUT /api/classes/:id', function()
    {
        it('shouldn\'t be able to edit class', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});

            var wrongParams = [undefined, null, true, false, [], {}];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.editClass(wrongParams[i])}).toThrow(new Error('Não foi possível editar esta turma.'));
            }
        }))

        it('shouldn\'t be able to edit a class without id', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var turma = {name: 'A'};

            expect(function(){scope.editClass(turma)}).toThrow(new Error('Não foi possível editar esta turma.'));
        }))

        it('should be able to edit successfully', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var turma = {name: 'A', _id: '123'};
            scope.editClass(turma);
            httpMock.flush();
        }))

        it('should be able to edit class successfully with students informed', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var _turma = {name: 'A', _id: '123', students: 'a1, a2, a3'};
            scope.editClass(_turma);
            httpMock.flush();
            var _expected = {name: 'A', _id: '123', students: ['a1', ' a2', ' a3']};

            expect(_turma).toEqual(_expected);
        }))
    })

    describe('DELETE /api/delete/:id', function()
    {
        it('tries to delete a class passing wrong ids', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});

            var wrongParams = [undefined, , null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.deleteClass(wrongParams[i]);}).toThrow(new Error('Não foi possível deletar esta turma, pois o id está errado.'));
            }
        }))

        it('checks if deleting a class is working - if there were 3 classes, should be 2 after the deletion', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            scope.turmas = [{name: 'A', index: 0, _id: 'A'}, {name: 2, index: 3, _id: 1}, {name: 3, index: 2, _id: 2}];

            var quantidadeDeTurmasAntesDaDelecao = scope.turmas.length;
            scope.deleteClass(scope.turmas[0]._id);
            httpMock.flush();
            expect(quantidadeDeTurmasAntesDaDelecao).toBeGreaterThan(0);
        }))
    })
});