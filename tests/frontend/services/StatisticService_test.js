"use strict";

describe('StatisticService', function()
{
    var httpMock, StatisticService;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        StatisticService = $injector.get('StatisticService');
    }))

    describe('checks elements creation', function()
    {
        it('checks if getEarnings was created', function()
        {
            expect(StatisticService.getEarnings).toBeDefined();
            expect(typeof StatisticService.getEarnings).toEqual('function');
        })

        it('checks if getInterestedStudents was created', function()
        {
            expect(StatisticService.getInterestedStudents).toBeDefined();
            expect(typeof StatisticService.getInterestedStudents).toEqual('function');
        })
    })

    describe('GET /api/earnings/trimester', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/earnings/trimester').respond();
            StatisticService.getEarnings();
            httpMock.flush();
        })
    })

    describe('GET /api/interestedStudents/month', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/interestedStudents/month').respond();
            StatisticService.getInterestedStudents();
            httpMock.flush();
        })
    })
})