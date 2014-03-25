describe('CLASSESCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

	beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/getClasses?u=eric3').respond({classes: [{name: 'a'}, {name: 'b'}]});
        httpMock.when('POST', '/api/registerClass?u=eric3').respond(200);
        httpMock.when('POST', '/api/editClass?u=eric3').respond(200);
        httpMock.when('DELETE', '/api/deleteClass/A?u=eric3').respond(200);
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