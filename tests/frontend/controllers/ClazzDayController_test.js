"use strict";

describe('ClazzDayController', function()
{
    var _scope, _httpMock, _currentMonthYear, _ClazzDay;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _currentMonthYear = moment().format("MM_YYYY");

        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _ClazzDay = $injector.get('ClazzDay');

        _httpMock.when('GET', '/api/protected/classes/name').respond([]);
        _httpMock.when('POST', '/api/protected/classes/dailyInfo').respond(200);
        _httpMock.when('GET', '/api/protected/classes/dailyInfo/'+_currentMonthYear).respond([]);
        _httpMock.when('GET', '/api/protected/students/name/turma1').respond([]);
        _httpMock.when('GET', '/api/protected/teachers/name').respond([]);
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

        it('checks if $scope.turma exists', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.turma instanceof _ClazzDay).toBeTruthy();
        }));

        it('checks if _scope.cfg was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }));

        it('checks if getStudentsNamesByClass is defined', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.getStudentsNamesByClass).toBeDefined();
            expect(typeof _scope.getStudentsNamesByClass).toEqual('function');
        }))

        it('checks if inputMaxController was created', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
        }))
    })

    describe('GET /api/protected/classes/dailyInfo/monthYear', function()
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
            _httpMock.expectGET('/api/protected/classes/dailyInfo/'+_currentMonthYear).respond();
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.informacaoDiaria).toEqual([]);
        }))

        it('should get a response from the server with empty object', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes/dailyInfo').respond({info: []});
            $controller('ClazzDayController', {$scope: _scope});
            expect(_scope.informacaoDiaria).toEqual([]);
        }))

        it('should get a filled response from the server', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes/dailyInfo/'+_currentMonthYear).respond([{_id: {name: "Aluno2"}, dailyInfo: [{year: 2014, month: 4, day: 10, wasInClass: false}]}]);
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();

            expect(_scope.informacaoDiaria[0]._id.name).toEqual('Aluno2');
            expect(_scope.informacaoDiaria[0].dailyInfo[0].year).toEqual(2014);
            expect(_scope.informacaoDiaria[0].dailyInfo[0].month).toEqual(4);
            expect(_scope.informacaoDiaria[0].dailyInfo[0].day).toEqual(10);
            expect(_scope.informacaoDiaria[0].dailyInfo[0].wasInClass).toEqual(false);
        }))
    })

    describe('GET /api/protected/classes/dailyInfo/:id/:monthYear', function()
    {
        it('should fetch request correctly', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes/dailyInfo/a123/04_2014').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getClassesDailyInfo('04/2014', 'a123');
            _httpMock.flush();
        }))

        it('should empty dailyInfo, server returned empty object', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes/dailyInfo/a123/05_2099').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.informacaoDiaria = [{name: "Algum Nome", id: 'abc1'}, {name: "Outro nome", id: 'abc2'}, {name: "Turma1", id: 'n3wId'}];
            _scope.getClassesDailyInfo('05/2099', 'a123');
            _httpMock.flush();
            expect(_scope.informacaoDiaria.length).toEqual(0);
        }))

        it('should empty dailyInfo, server returned empty array', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes/dailyInfo/a123/05_2099').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.informacaoDiaria = [{name: "Algum Nome", id: 'abc1'}, {name: "Outro nome", id: 'abc2'}, {name: "Turma1", id: 'n3wId'}];
            _scope.getClassesDailyInfo('05/2099', 'a123');
            _httpMock.flush();
            expect(_scope.informacaoDiaria.length).toEqual(0);
        }))

        it('should replace informacaoDiaria correctly', inject(function($controller)
        {
            var _responseCompleteRequest = [{name: "Algum Nome", _id: 'abc1'}, {name: "Outro nome", _id: 'abc2'}, {name: "Turma1", _id: 'a123', anotherInfo: '567'}];
            var _responseSpecificRequest = [{name: "Turma1", _id: 'a123', anotherInfo: '123'}];

            _httpMock.expectGET('/api/protected/classes/dailyInfo/'+_currentMonthYear).respond(_responseCompleteRequest);
            _httpMock.expectGET('/api/protected/classes/dailyInfo/a123/'+_currentMonthYear).respond(_responseSpecificRequest);

            $controller('ClazzDayController', {$scope: _scope});
            _scope.getClassesDailyInfo(_currentMonthYear.replace('_', '/'), 'a123');
            _httpMock.flush();

            expect(_scope.informacaoDiaria[2].name).toEqual("Turma1");
            expect(_scope.informacaoDiaria[2]._id).toEqual("a123");
            expect(_scope.informacaoDiaria[2].anotherInfo).toEqual("567");
        }))
    })

    describe('GET /api/protected/classes/name', function()
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
            expect(_scope.clazzesNames.length).toEqual(0);
        }))

        it('should fetch request right away - partial response from server', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes/name').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.clazzesNames.length).toEqual(0);
        }))

        it('should fetch request right away - complete response from server', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/classes/name').respond([{name: "Turma1"}, {name: "Turma2"}]);
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.clazzesNames[0].name).toEqual("Turma1");
            expect(_scope.clazzesNames[1].name).toEqual("Turma2");
        }))
    })

    describe('POST /api/protected/classes/dailyInfo', function()
    {
        it('should reject the object not valid clazz day', inject(function($controller)
        {
            $controller('ClazzDayController', {$scope: _scope});
            var wrongParams = helper.invalidObjects();

            var _onSuccess = function()
            {
                expect(true).toBeFalsy();
            }

            var _onError = function(error)
            {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error).toContain('Não será possível continuar, pois alguns parâmetros não foram informados.');
            }

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.registerClazzDay(wrongParams[i], wrongParams[i])
                }).not.toThrow(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));
            }
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

    describe('GET /api/protected/students/name/:turma', function()
    {
        it('checks if the request is being made', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/name/turma1').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
        }))

        it('checks if /students/name/:turma is working even when there\'s no response', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/name/turma1').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(typeof _scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNamesByClass is working even when the response isn\'t complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/name/turma1').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(typeof _scope.alunos).toEqual('object');
        }))

        it('checks if /getStudentsNamesByClass is working when the response is complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/name/turma1').respond([{name: 'turma1'}]);
            $controller('ClazzDayController', {$scope: _scope});
            _scope.getStudentsNamesByClass('turma1');
            _httpMock.flush();
            expect(_scope.alunos).toBeDefined();
            expect(typeof _scope.alunos).toEqual('object');
            expect(_scope.alunos[0].name).toEqual('turma1');
            expect(_scope.alunos.length).toEqual(1);
        }))
    })

    describe('GET /api/protected/teachers/name', function()
    {
        it('checks if the request is being made', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/teachers/name').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
        }))

        it('checks if /getTeachersNames is working even when there\'s no response', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/teachers/name').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working even when the response isn\'t complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/teachers/name').respond([]);
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toEqual('object');
        }))

        it('checks if /getTeachersNames is working when the response is complete', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/teachers/name').respond([{name: 'professor1'}]);
            $controller('ClazzDayController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.professores).toBeDefined();
            expect(typeof _scope.professores).toEqual('object');
            expect(_scope.professores.length).toEqual(1);
            expect(_scope.professores[0].name).toEqual('professor1');
        }))
    })
})