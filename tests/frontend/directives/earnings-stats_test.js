"use strict";

describe('EARNINGSTATS BEING TESTED', function()
{
    var scope, element, httpMock, compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        compile = $injector.get('$compile');
        httpMock.when('GET', '/api/getEarningByTrimester').respond({});
        var html = '<earnings-stats>' +
                        '<div class="info-card transition">'+
                            '<h3>arrecadação por trimestre</h3>'+
                            '<div id="column-chart" class="chart"></div>'+
                        '</div>'+
                   '</earnings-stats>';
        element = compile(angular.element(html))(scope);
        scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if directive was created', function()
        {
            expect(element).toBeDefined();
        })

        it('checks the controller', function()
        {
            expect(element.controller('earningsStats')).toBeDefined();
        })

        it('checks the controller', function()
        {
            expect(element.scope().valoresTrimestre).toBeDefined();
            expect(typeof element.scope().valoresTrimestre).toEqual("object");
        })
    })

    describe('/getEarningByTrimester', function()
    {
        it('should test the return /get without any response', function()
        {
            /*httpMock.expectGET('/api/getEarningByTrimester').respond({});
            httpMock.flush();

            expect(element.scope().valoresTrimestre[0]).toEqual(0);
            expect(element.scope().valoresTrimestre[1]).toEqual(0);
            expect(element.scope().valoresTrimestre[2]).toEqual(0);
            expect(element.scope().valoresTrimestre[3]).toEqual(0);*/
        })
    })
})