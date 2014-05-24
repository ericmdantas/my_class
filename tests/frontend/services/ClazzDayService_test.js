"use strict";

describe('ClazzDayService', function()
{
    var httpMock, ClazzDayService;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        ClazzDayService = $injector.get('ClazzDayService');
    }))

    describe('check elements creation', function()
    {
        it('checks if getDailyInfo was created', function()
        {
            expect(ClazzDayService.getDailyInfo).toBeDefined();
            expect(typeof ClazzDayService.getDailyInfo).toEqual('function');
        })

        it('checks if registerDailyInfo was created', function()
        {
            expect(ClazzDayService.registerDailyInfo).toBeDefined();
            expect(typeof ClazzDayService.registerDailyInfo).toEqual('function');
        })
    })

    describe('GET /api/classes/dailyInfo/:monthYear', function()
    {
        it('should throw error - wrong monthYear param', function()
        {
            var wrongParams = [function(){}, {}, [], true, false, '', undefined, null];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){ClazzDayService.getDailyInfo(wrongParams[i])})
                                                 .toThrow(new Error('Não é possível buscar as informações de aula. Parâmetro MÊS/ANO passado errado.'));
            }
        })

        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/classes/dailyInfo/14_2014').respond();
            var _monthYear = '14_2014';

            ClazzDayService.getDailyInfo(_monthYear);
            httpMock.flush();
        })
    })

    describe('GET /api/classes/dailyInfo/:id/:monthYear', function()
    {
        it('should throw error - invalid monthYear', function()
        {
            var _wrongParams = ["", null, undefined, true, false, 1, function(){}, {}, []];
            var _id = 'a123';

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){ClazzDayService.getDailyInfoByClass(_wrongParams[i], _id)})
                    .toThrow(new Error('Não é possível buscar as informações de aula para esta turma. Parâmetro MÊS/ANO passado errado.'));
            }
        })

        it('should throw error - invalid _id', function()
        {
            var _wrongParams = ["", null, undefined, true, false, 1, function(){}, {}, []];
            var _monthYear = '04_2014';

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){ClazzDayService.getDailyInfoByClass(_monthYear, _wrongParams[i])})
                    .toThrow(new Error('Não é possível buscar as informações de aula para esta turma. Parâmetro ID passado errado.'));
            }
        })

        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/classes/dailyInfo/a123/04_2014').respond();
            var _id = 'a123';
            var _monthYear = '04_2014';

            ClazzDayService.getDailyInfoByClass(_monthYear, _id);
            httpMock.flush();
        })
    })

    describe('POST /api/classes/dailyInfo', function()
    {
        it('should throw error - wrong moment param', function()
        {
            var wrongParams = [function(){}, {}, [], true, false, '', undefined, null];

            for (var i = 0; i < wrongParams.length; i++)
            {
                expect(function(){ClazzDayService.registerDailyInfo(wrongParams[i])})
                                                 .toThrow(new Error('Não é possível registrar aula. Parâmetro MOMENTO passado errado.'));
            }
        })

        it('should register clazzDay correctly', function()
        {
            httpMock.expectPOST('/api/classes/dailyInfo').respond();
            var _moment = {name: "turma1"};

            ClazzDayService.registerDailyInfo(_moment);
            httpMock.flush();
        })
    })
})