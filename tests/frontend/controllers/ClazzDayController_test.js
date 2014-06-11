"use strict";

describe('CLAZZDAYCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock, _currentMonthYear;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _currentMonthYear = moment().format("MM_YYYY");

        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _httpMock.when('GET', '/api/classes/name').respond();
        _httpMock.when('GET', '/api/classes/dailyInfo/'+_currentMonthYear).respond();
        _httpMock.when('GET', '/api/students/name/turma1').respond({});
        _httpMock.when('GET', '/api/teachers/name').respond({});
        _httpMock.when('POST', '/api/classes/dailyInfo').respond(200);
    }))

    describe('checks elements creation', function()
    {
        it('checks if classeccontroller exists and is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect('ClassesController').toBeDefined();
        }))

        it('checks if registerClazzDay is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.registerClazzDay).toBeDefined();
        }))

        it('checks if $scope.turmaEscolhida exists', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(typeof _scope.aulaEscolhida).toEqual('object');
        }));

        it('checks if _scope.isLoadingVisible created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.isLoadingVisible).toBeDefined();
            expect(_scope.isLoadingVisible.modal).toEqual(false);
        }));

        it('checks if _scope.cfg was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }));

        it('checks if modals are ready to be opened - openModalToRegisterClazzDay', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.openModalToRegisterClazzDay).toBeDefined();
            expect(typeof _scope.openModalToRegisterClazzDay).toEqual('function');
        }))

        it('checks if getStudentsNamesByClass is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.getStudentsNamesByClass).toBeDefined();
            expect(typeof _scope.getStudentsNamesByClass).toEqual('function');
        }))

        it('checks if getTeachersNames is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.getTeachersNames).toBeDefined();
            expect(typeof _scope.getTeachersNames).toEqual('function');
        }))

        it('checks if getClassesDailyInfo is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.getClassesDailyInfo).toBeDefined();
            expect(typeof _scope.getClassesDailyInfo).toEqual('function');
        }))

        it('checks if inputMaxController was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
        }))
    })

    describe('GET /api/classes/dailyInfo/monthYear', function()
    {
        it('should throw exception - passing wrong params to the get', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});

            var wrongParams = ['123456', '', undefined, null, function(){}, true, false, {}, [], 1, "aa_bcdef", "aa.bcdef", "aa/bcdef", "aa+bcdef"];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.getClassesDailyInfo(wrongParams[i])
                }).toThrow(new Error('Não foi informado o ano e mês correto para consulta.'));
            }
        }))

        it('should get a response from the server with nothing', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/dailyInfo/'+_currentMonthYear).respond();
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.informacaoDiaria).toEqual([]);
        }))

        it('should get a response from the server with empty object', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/dailyInfo').respond({info: []});
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.informacaoDiaria).toEqual([]);
        }))

        it('should get a filled response from the server', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/dailyInfo/'+_currentMonthYear).respond({info: [{_id: {name: "Aluno2"}, dailyInfo: [{year: 2014, month: 4, day: 10, wasInClass: false}]}]});
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();

            expect(_scope.informacaoDiaria[0]._id.name).toEqual('Aluno2');
            expect(_scope.informacaoDiaria[0].dailyInfo[0].year).toEqual(2014);
            expect(_scope.informacaoDiaria[0].dailyInfo[0].month).toEqual(4);
            expect(_scope.informacaoDiaria[0].dailyInfo[0].day).toEqual(10);
            expect(_scope.informacaoDiaria[0].dailyInfo[0].wasInClass).toEqual(false);
        }))
    })

    describe('GET /api/classes/dailyInfo/:id/:monthYear', function()
    {
        it('should fetch request correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/dailyInfo/a123/04_2014').respond();
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getClassesDailyInfo('04/2014', 'a123');
            _httpMock.flush();
        }))

        it('should empty dailyInfo, server returned empty object', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/dailyInfo/a123/05_2099').respond();
            $controller('ClazzDayController', {$scope: _scope});
            _scope.informacaoDiaria = [{name: "Algum Nome", id: 'abc1'}, {name: "Outro nome", id: 'abc2'}, {name: "Turma1", id: 'n3wId'}];
            _scope.getClassesDailyInfo('05/2099', 'a123');
            _httpMock.flush();
            expect(_scope.informacaoDiaria).toEqual([]);
        }))

        it('should empty dailyInfo, server returned empty array', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/dailyInfo/a123/05_2099').respond({info: {}});
            $controller('ClazzDayController', {$scope: _scope});
            _scope.informacaoDiaria = [{name: "Algum Nome", id: 'abc1'}, {name: "Outro nome", id: 'abc2'}, {name: "Turma1", id: 'n3wId'}];
            _scope.getClassesDailyInfo('05/2099', 'a123');
            _httpMock.flush();
            expect(_scope.informacaoDiaria).toEqual([]);
        }))

        it('should replace informacaoDiaria correctly', inject(function($controller)
        {
            var _responseCompleteRequest = {info: [{name: "Algum Nome", _id: 'abc1'}, {name: "Outro nome", _id: 'abc2'}, {name: "Turma1", _id: 'a123', anotherInfo: '567'}]};
            var _responseSpecificRequest = {info: {name: "Turma1", _id: 'a123', anotherInfo: '123'}};

            _httpMock.expectGET('/api/classes/dailyInfo/'+_currentMonthYear).respond(_responseCompleteRequest);
            _httpMock.expectGET('/api/classes/dailyInfo/a123/'+_currentMonthYear).respond(_responseSpecificRequest);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getClassesDailyInfo(_currentMonthYear.replace('_', '/'), 'a123');
            _httpMock.flush();

            expect(_scope.informacaoDiaria[2]).toEqual({name: "Turma1", _id: 'a123', anotherInfo: '123'});
        }))
    })

    describe('GET /api/classes/name', function()
    {
        it('should fetch request right away', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
        }))

        it('should fetch request right away empty response from server', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.clazzesNames).toEqual([]);
        }))

        it('should fetch request right away - partial response from server', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/name').respond({classes: []});
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.clazzesNames).toEqual([]);
        }))

        it('should fetch request right away - complete response from server', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/name').respond({classes: [{name: "Turma1"}, {name: "Turma2"}]});
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.clazzesNames[0].name).toEqual("Turma1");
            expect(_scope.clazzesNames[1].name).toEqual("Turma2");
        }))
    })

    describe('POST /api/classes/dailyInfo', function()
    {
        it('shouldn\'t fetch request - empty parameters', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});

            var wrongParams = [undefined, null, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.registerClazzDay(wrongParams[i], wrongParams[i])})
                                 .toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));
            }
        }))

        it('should throw error - wrong turmaDia.teacherName param', inject(function($controller)
        {
            _httpMock.expectGET('/api/classes/dailyInfo').respond();
            $controller('ClazzDayController', {$scope: _scope});

            var _turma = {name: 'Turma1', teacherName: 'Something wrong'};
            var _alunos = {studentsInClass: [{name: 'Abc', wasInClass: false}]};

            expect(function()
            {
                _scope.registerClazzDay(_turma, _alunos)
            }).toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));
        }))

        it('shouldn\'t fetch request - wrong obligatory parameters', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});

            var turma = {teache: "professor", date: new Date(), subject: 'matéria', observation: 'observação'};
            var alunos = {studentsInClass: [{name: 'Abc', isInClass: false}]};

            expect(function()
            {
                _scope.registerClazzDay(turma, alunos)
            }).toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));

            turma = {teacher: "professor", date: new Date(), subjecto: 'matéria', observation: 'observação'};
            alunos = {studentsInClass: [{name: 'Abc', isInClass: false}]};

            expect(function()
                {
                    _scope.registerClazzDay(turma, alunos)
                }).toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));

            turma = {teache: "professor", date: new Date(), subject: 'matéria', observation: 'observação'};
            alunos = {studentsInClass: [{nome: 'Abc', inClass: false}]};

            expect(function()
            {
                _scope.registerClazzDay(turma, alunos)
            }).toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));
        }))

        it('should fetch request', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});

            var turma = {teacherName: {name: "professor"}, date: new Date(), subject: 'matéria'};
            var alunos = {studentsInClass: [{name: 'Abc', wasInClass: false}]};

            _scope.registerClazzDay(turma, alunos);
            _httpMock.flush();
        }))
    })

    describe('GET /api/students/name/:turma', function()
    {
        it('tries to make a request passing the wrong parameters', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});

            var wrongParams = [null, undefined, {}, [], true, false];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){_scope.getStudentsNamesByClass(wrongParams[i])}).toThrow(new Error('Não foi possível pegar os nomes dos alunos.'));
            }
        }))

        it('checks if the request is being made', inject(function($controller)
        {
            _httpMock.expectGET('/api/students/name/turma1').respond({});
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
        }))

        it('checks if /students/name/:turma is working even when there\'s no response', inject(function($controller)
        {
            _httpMock.expectGET('/api/students/name/turma1').respond({});
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(typeof _scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNamesByClass is working even when the response isn\'t complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/students/name/turma1').respond({students: []});
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(typeof _scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNamesByClass is working when the response is complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/students/name/turma1').respond({students: [{name: 'turma1'}]});
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(typeof _scope.alunos).toEqual('object');
            expect(_scope.alunos[0].name).toEqual('turma1');
            expect(_scope.alunos.length).toEqual(1);
        }))
    })

    describe('GET /api/teachers/name', function()
    {
        it('checks if the request is being made', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers/name').respond({});
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
        }))

        it('checks if /getTeachersNames is working even when there\'s no response', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers/name').respond({});
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working even when the response isn\'t complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers/name').respond({students: []});
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working when the response is complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/teachers/name').respond({resultado: [{name: 'professor1'}]});
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toEqual('object');
            expect(_scope.professores[0].name).toEqual('professor1');
            expect(_scope.professores.length).toEqual(1);
        }))
    })

    describe('checks if opening modal to set work is working properly', function()
    {
        it('checks if opening class and passing an empty object is behaving ok', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            _scope.openModalToRegisterClazzDay();
        }))
    })

    describe('historico should be visible/invisible', function()
    {
        it('checks if historico is visible - passing undefined values', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(function(){_scope.isHistoricoVisible(undefined)}).not.toThrow(new Error('Este valor não é um número'));
            expect(function(){_scope.isHistoricoVisible(null)}).not.toThrow(new Error('Este valor não é um número'));
        }))

        it('checks if historico is visible - shouldn\'t be visible', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.isHistoricoVisible(0)).toBe(false);
            expect(_scope.isHistoricoVisible(-1)).toBe(false);
        }))

        it('checks if historico is visible - should be visible', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.isHistoricoVisible(1)).toBe(true);
            expect(_scope.isHistoricoVisible(12)).toBe(true);
        }))
    })
})