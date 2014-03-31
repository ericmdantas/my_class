describe('CLASSESCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

	beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/getClasses').respond({classes: [{name: 'a'}, {name: 'b'}]});
        httpMock.when('GET', '/api/getStudentsNames/aluno1').respond({});
        httpMock.when('GET', '/api/getTeachersNames').respond({});
        httpMock.when('POST', '/api/registerClass').respond(200);
        httpMock.when('POST', '/api/editClass').respond(200);
        httpMock.when('DELETE', '/api/deleteClass/A').respond(200);
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

        it('checks if getTeachersNames is defined', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.getTeachersNames).toBeDefined();
            expect(typeof scope.getTeachersNames).toEqual('function');
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

    describe('checks if opening modal to set work is working properly', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var chosenClass = {};
            scope.openModalToRegisterDayByDay(chosenClass);
            expect(scope.turmaEscolhida).toEqual(chosenClass);
        }))

        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            var chosenClass = {_id: 'abc', name: 'Turma1'};
            scope.openModalToRegisterDayByDay(chosenClass);
            expect(scope.turmaEscolhida).toEqual(chosenClass);
        }))
    })

    describe('/getStudentsNames', function()
    {
        it('checks if the request is being made', inject(function($controller)
        {
            httpMock.expectGET('/api/getStudentsNames/aluno1').respond({});
            $controller('ClassesController', {$scope: scope});
            scope.getStudentsNames('aluno1');
            httpMock.flush();
        }))

        it('checks if /getStudentsNames is working even when there\'s no response', inject(function($controller)
        {
            httpMock.expectGET('/api/getStudentsNames/aluno1').respond({});
            $controller('ClassesController', {$scope: scope});
            scope.getStudentsNames('aluno1');
            httpMock.flush();
            expect(scope.alunos).toBeDefined();
            expect(typeof scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNames is working even when the response isn\'t complete', inject(function($controller)
        {
            httpMock.expectGET('/api/getStudentsNames/aluno1').respond({students: []});
            $controller('ClassesController', {$scope: scope});
            scope.getStudentsNames('aluno1');
            httpMock.flush();
            expect(scope.alunos).toBeDefined();
            expect(typeof scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNames is working when the response is complete', inject(function($controller)
        {
            httpMock.expectGET('/api/getStudentsNames/aluno1').respond({students: [{name: 'aluno1'}]});
            $controller('ClassesController', {$scope: scope});
            scope.getStudentsNames('aluno1');
            httpMock.flush();
            expect(scope.alunos).toBeDefined();
            expect(typeof scope.alunos).toEqual('object');
            expect(scope.alunos[0].name).toEqual('aluno1');
            expect(scope.alunos.length).toEqual(1);
        }))
    })

    describe('/getTeachersNames', function()
    {
        it('checks if the request is being made', inject(function($controller)
        {
            httpMock.expectGET('/api/getTeachersNames').respond({});
            $controller('ClassesController', {$scope: scope});
            httpMock.flush();
        }))

        it('checks if /getTeachersNames is working even when there\'s no response', inject(function($controller)
        {
            httpMock.expectGET('/api/getTeachersNames').respond({});
            $controller('ClassesController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores).toBeDefined();
            expect(typeof scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working even when the response isn\'t complete', inject(function($controller)
        {
            httpMock.expectGET('/api/getTeachersNames').respond({students: []});
            $controller('ClassesController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores).toBeDefined();
            expect(typeof scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working when the response is complete', inject(function($controller)
        {
            httpMock.expectGET('/api/getTeachersNames').respond({resultado: [{name: 'professor1'}]});
            $controller('ClassesController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores).toBeDefined();
            expect(typeof scope.professores).toEqual('object');
            expect(scope.professores[0].name).toEqual('professor1');
            expect(scope.professores.length).toEqual(1);
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

    describe('changing dates', function()
    {
        it('checks if adding advancing a month is working', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope})
            expect(scope.changeDate(moment().format('MM/YYYY'), 'add')).toBe(moment().add('months', 1).calendar());
        }))

        it('checks if adding reducing a month is working', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope})
            expect(scope.changeDate(moment().format('MM/YYYY'), 'subtract')).toBe(moment().subtract('months', 1).calendar());
        }))
    })

    describe('removing class', function()
    {
        it('tries to delete a class passing wrong ids', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(function(){scope.deleteClass({});}).toThrow(new Error('Não foi possível deletar esta turma, pois o id está errado.'));
            expect(function(){scope.deleteClass(undefined);}).toThrow(new Error('Não foi possível deletar esta turma, pois o id está errado.'));
            expect(function(){scope.deleteClass(null);}).toThrow(new Error('Não foi possível deletar esta turma, pois o id está errado.'));
        }))

        it('checks if deleting a class is working - if there were 3 classes, should be 2 after the deletion', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            scope.turmas = [{name: 'A', index: 0, _id: 'A'}, {name: 2, index: 3, _id: 1}, {name: 3, index: 2, _id: 2}];

            var quantidadeDeTurmasAntesDaDelecao = scope.turmas.length;
            scope.deleteClass(scope.turmas[0]._id);
            httpMock.flush();
            var quantidadeDeTurmasDepoisDaDelecao = scope.turmas.length;
            expect(quantidadeDeTurmasAntesDaDelecao).toBeGreaterThan(quantidadeDeTurmasDepoisDaDelecao);
        }))
    })

    describe('registering class', function()
    {
        it('checks if adding a class is working - if there were 3 classes, should be 4 after the adition', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            scope.turmas = [{name: 1}, {name: 2}, {name: 3}];
            scope.registerClass(scope.turmas[0]);
            httpMock.flush();

            expect(scope.turmas.length).toBeGreaterThan(0);
        }))
    })

    describe('historico should be visible/invisible', function()
    {
        it('checks if historico is visible - passing undefined values', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(function(){scope.isHistoricoVisible(undefined)}).not.toThrow(new Error('Este valor não é um número'));
            expect(function(){scope.isHistoricoVisible(null)}).not.toThrow(new Error('Este valor não é um número'));
        }))

        it('checks if historico is visible - shouldn\'t be visible', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.isHistoricoVisible(0)).toBe(false);
            expect(scope.isHistoricoVisible(-1)).toBe(false);
        }))

        it('checks if historico is visible - should be visible', inject(function($controller)
        {
            $controller('ClassesController', {$scope: scope});
            expect(scope.isHistoricoVisible(1)).toBe(true);
            expect(scope.isHistoricoVisible(12)).toBe(true);
        }))
    })
});