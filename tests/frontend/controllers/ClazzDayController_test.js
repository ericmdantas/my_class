"use strict";

describe('CLAZZDAYCONTROLLER BEING TESTED', function()
{
    var scope, httpMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        httpMock.when('GET', '/api/classes').respond({classes: [{name: 'a'}, {name: 'b'}]});
        httpMock.when('GET', '/api/classes/dailyInfo').respond();
        httpMock.when('GET', '/api/students/name/turma1').respond({});
        httpMock.when('GET', '/api/teachers/name').respond({});
        httpMock.when('POST', '/api/classes/dailyInfo').respond(200);
    }))

    describe('checks elements creation', function()
    {
        it('checks if classeccontroller exists and is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect('ClassesController').toBeDefined();
        }))

        it('checks if registerClazzDay is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.registerClazzDay).toBeDefined();
        }))

        it('checks if $scope.turmaEscolhida exists', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(typeof scope.aulaEscolhida).toEqual('object');
        }));

        it('checks if scope.isLoadingVisible created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.isLoadingVisible).toBeDefined();
            expect(scope.isLoadingVisible.modal).toEqual(false);
        }));

        it('checks if scope.cfg was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }));

        it('checks if scope.getClasses was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.getClasses).toBeDefined();
            expect(typeof scope.getClasses).toBe('function');
        }))

        it('checks if modals are ready to be opened - openModalToDeleteClazzDay', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.openModalToDeleteClazzDay).toBeDefined();
            expect(typeof scope.openModalToDeleteClazzDay).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToRegisterClazzDay', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.openModalToRegisterClazzDay).toBeDefined();
            expect(typeof scope.openModalToRegisterClazzDay).toEqual('function');
        }))

        it('checks if modals are ready to be opened - openModalToEditClazzDay', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.openModalToEditClazzDay).toBeDefined();
            expect(typeof scope.openModalToEditClazzDay).toEqual('function');
        }))

        it('checks if getStudentsNamesByClass is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.getStudentsNamesByClass).toBeDefined();
            expect(typeof scope.getStudentsNamesByClass).toEqual('function');
        }))

        it('checks if getTeachersNames is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.getTeachersNames).toBeDefined();
            expect(typeof scope.getTeachersNames).toEqual('function');
        }))

        it('checks if getClassesDailyInfo is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.getClassesDailyInfo).toBeDefined();
            expect(typeof scope.getClassesDailyInfo).toEqual('function');
        }))

        it('checks if monthYear was created correctly', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.monthYear).toBeDefined();
        }))

        it('checks if editClazzDay was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.editClazzDay).toBeDefined();
        }))

        it('checks if editClazzDay was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.deleteClazzDay).toBeDefined();
        }))
    })

    describe('checks if opening modal to edit class is working properly', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            var chosenClass = {};
            scope.openModalToEditClazzDay(chosenClass);
            expect(scope.aulaEscolhida).toEqual(chosenClass);
        }))

        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            var chosenClass = {_id: 'abc', name: 'Turma1'};
            scope.openModalToEditClazzDay(chosenClass);
            expect(scope.aulaEscolhida).toEqual(chosenClass);
        }))
    })

    describe('GET /api/classes', function()
    {
        it('should get a response from the server with nothing', inject(function($controller)
        {
            httpMock.expectGET('/api/classes').respond();
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.turmasCadastradas).toEqual([]);
        }))

        it('should get a response from the server with empty object', inject(function($controller)
        {
            httpMock.expectGET('/api/classes').respond({classes: []});
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.turmasCadastradas).toEqual([]);
        }))

        it('should get a filled response from the server', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            httpMock.flush();

            expect(scope.turmasCadastradas[0]).toEqual({name: 'a'});
            expect(scope.turmasCadastradas[1]).toEqual({name: 'b'});
        }))
    })

    describe('GET /api/classes/dailyInfo', function()
    {
        it('should get a response from the server with nothing', inject(function($controller)
        {
            httpMock.expectGET('/api/classes/dailyInfo').respond();
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.informacaoDiaria).toEqual([]);
        }))

        it('should get a response from the server with empty object', inject(function($controller)
        {
            httpMock.expectGET('/api/classes/dailyInfo').respond({info: []});
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.informacaoDiaria).toEqual([]);
        }))

        it('should get a filled response from the server', inject(function($controller)
        {
            httpMock.expectGET('/api/classes/dailyInfo').respond({info: [{_id: {name: "Aluno2"}, dailyInfo: [{year: 2014, month: 4, day: 10, wasInClass: false}]}]});
            $controller('ClazzDayController', {$scope: scope});
            httpMock.flush();

            expect(scope.informacaoDiaria[0]._id.name).toEqual('Aluno2');
            expect(scope.informacaoDiaria[0].dailyInfo[0].year).toEqual(2014);
            expect(scope.informacaoDiaria[0].dailyInfo[0].month).toEqual(4);
            expect(scope.informacaoDiaria[0].dailyInfo[0].day).toEqual(10);
            expect(scope.informacaoDiaria[0].dailyInfo[0].wasInClass).toEqual(false);
        }))
    })

    describe('POST /api/classes/dailyInfo', function()
    {
        it('shouldn\'t fetch request - empty parameters', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});

            var wrongParams = [undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.registerClazzDay(wrongParams[i], wrongParams[i])})
                                 .toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));
            }
        }))

        it('shouldn\'t fetch request - wrong obligatory parameters', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});

            var turma = {teache: "professor", date: new Date(), subject: 'matéria', observation: 'observação'};
            var alunos = {studentsInClass: [{name: 'Abc', isInClass: false}]};

            expect(function(){scope.registerClazzDay(turma, alunos)}).toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));

            turma = {teacher: "professor", date: new Date(), subjecto: 'matéria', observation: 'observação'};
            alunos = {studentsInClass: [{name: 'Abc', isInClass: false}]};

            expect(function(){scope.registerClazzDay(turma, alunos)}).toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));

            turma = {teache: "professor", date: new Date(), subject: 'matéria', observation: 'observação'};
            alunos = {studentsInClass: [{nome: 'Abc', inClass: false}]};

            expect(function(){scope.registerClazzDay(turma, alunos)}).toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));
        }))

        it('should fetch request', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});

            var turma = {teacherName: "professor", date: new Date(), subject: 'matéria'};
            var alunos = {studentsInClass: [{name: 'Abc', wasInClass: false}]};

            scope.registerClazzDay(turma, alunos);
            httpMock.flush();
        }))
    })

    describe('GET /api/students/name/:turma', function()
    {
        it('tries to make a request passing the wrong parameters', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});

            var wrongParams = [null, undefined, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){scope.getStudentsNamesByClass(wrongParams[i])}).toThrow(new Error('Não foi possível pegar os nomes dos alunos.'));
            }
        }))

        it('checks if the request is being made', inject(function($controller)
        {
            httpMock.expectGET('/api/students/name/turma1').respond({});
            $controller('ClazzDayController', {$scope: scope});
            scope.getStudentsNamesByClass('turma1');
            httpMock.flush();
        }))

        it('checks if /students/name/:turma is working even when there\'s no response', inject(function($controller)
        {
            httpMock.expectGET('/api/students/name/turma1').respond({});
            $controller('ClazzDayController', {$scope: scope});
            scope.getStudentsNamesByClass('turma1');
            httpMock.flush();
            expect(scope.alunos).toBeDefined();
            expect(typeof scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNamesByClass is working even when the response isn\'t complete', inject(function($controller)
        {
            httpMock.expectGET('/api/students/name/turma1').respond({students: []});
            $controller('ClazzDayController', {$scope: scope});
            scope.getStudentsNamesByClass('turma1');
            httpMock.flush();
            expect(scope.alunos).toBeDefined();
            expect(typeof scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNamesByClass is working when the response is complete', inject(function($controller)
        {
            httpMock.expectGET('/api/students/name/turma1').respond({students: [{name: 'turma1'}]});
            $controller('ClazzDayController', {$scope: scope});
            scope.getStudentsNamesByClass('turma1');
            httpMock.flush();
            expect(scope.alunos).toBeDefined();
            expect(typeof scope.alunos).toEqual('object');
            expect(scope.alunos[0].name).toEqual('turma1');
            expect(scope.alunos.length).toEqual(1);
        }))
    })

    describe('GET /api/teachers/name', function()
    {
        it('checks if the request is being made', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers/name').respond({});
            $controller('ClazzDayController', {$scope: scope});
            httpMock.flush();
        }))

        it('checks if /getTeachersNames is working even when there\'s no response', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers/name').respond({});
            $controller('ClazzDayController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores).toBeDefined();
            expect(typeof scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working even when the response isn\'t complete', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers/name').respond({students: []});
            $controller('ClazzDayController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores).toBeDefined();
            expect(typeof scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working when the response is complete', inject(function($controller)
        {
            httpMock.expectGET('/api/teachers/name').respond({resultado: [{name: 'professor1'}]});
            $controller('ClazzDayController', {$scope: scope});
            httpMock.flush();
            expect(scope.professores).toBeDefined();
            expect(typeof scope.professores).toEqual('object');
            expect(scope.professores[0].name).toEqual('professor1');
            expect(scope.professores.length).toEqual(1);
        }))
    })

    describe('checks if opening modal to set work is working properly', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            var chosenClass = {};
            scope.openModalToRegisterClazzDay(chosenClass);
            expect(scope.turmaDiaDia).toEqual(chosenClass);
        }))

        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            var chosenClass = {_id: 'abc', name: 'Turma1'};
            scope.openModalToRegisterClazzDay(chosenClass);
            expect(scope.turmaDiaDia).toEqual(chosenClass);
        }))
    })

    describe('historico should be visible/invisible', function()
    {
        it('checks if historico is visible - passing undefined values', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(function(){scope.isHistoricoVisible(undefined)}).not.toThrow(new Error('Este valor não é um número'));
            expect(function(){scope.isHistoricoVisible(null)}).not.toThrow(new Error('Este valor não é um número'));
        }))

        it('checks if historico is visible - shouldn\'t be visible', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.isHistoricoVisible(0)).toBe(false);
            expect(scope.isHistoricoVisible(-1)).toBe(false);
        }))

        it('checks if historico is visible - should be visible', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: scope});
            expect(scope.isHistoricoVisible(1)).toBe(true);
            expect(scope.isHistoricoVisible(12)).toBe(true);
        }))
    })

    /*describe('changing dates', function()
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
     })*/

})