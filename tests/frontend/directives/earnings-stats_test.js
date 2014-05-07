"use strict";

describe('EARNINGSTATS BEING TESTED', function()
{
    var _scope, _element, _httpMock, _compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _compile = $injector.get('$compile');

        _httpMock.when('GET', '/api/earnings/trimester').respond({});

        var _html = '<earnings-stats>' +
                        '<div class="info-card transition">'+
                            '<h3>arrecadação por trimestre</h3>'+
                            '<div id="column-chart" class="chart"></div>'+
                        '</div>'+
                   '</earnings-stats>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if directive was created', function()
        {
            expect(_element).toBeDefined();
        })

        it('checks the controller', function()
        {
            expect(_element.controller('earningsStats')).toBeDefined();
        })

        it('checks the controller', function()
        {
            expect(_element.scope().valoresTrimestre).toBeDefined();
            expect(typeof _element.scope().valoresTrimestre).toEqual("object");
        })
    })

    describe('/getEarningByTrimester', function()
    {
        //TODO: FIX THE GET TEST

        /*it('should test the return /get without any response', function()
        {
            _httpMock.expectGET('/api/getEarningByTrimester').respond({});
            _httpMock.flush()

            expect(_element.scope().valoresTrimestre[0]).toEqual(0);
            expect(_element.scope().valoresTrimestre[1]).toEqual(0);
            expect(_element.scope().valoresTrimestre[2]).toEqual(0);
            expect(_element.scope().valoresTrimestre[3]).toEqual(0);
        })*/
    })
})