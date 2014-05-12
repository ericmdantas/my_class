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
        it('should work even if the server doesn\'t return anything', function()
        {
            _httpMock.expectGET('/api/earnings/trimester').respond();
            _element.scope().getEarnings(function(){});

            _httpMock.flush();

            expect(_element.scope().valoresTrimestre).toEqual([]);
        })

        it('should work even if the server doesn\'t return the full response', function()
        {
            _httpMock.expectGET('/api/earnings/trimester').respond({resultado: {}});
            _element.scope().getEarnings(function(){});

            _httpMock.flush();

            expect(_element.scope().valoresTrimestre).toEqual([]);
        })

        it('should work correctly when the server returns the complete response', function()
        {
            var _fullResponse = {resultado: {valorPrimeiroTrimestre: 555,
                                             valorSegundoTrimestre: 666,
                                             valorTerceiroTrimestre: 777,
                                             valorQuartoTrimestre: 888}
                                }

            _httpMock.expectGET('/api/earnings/trimester').respond(_fullResponse);
            _element.scope().getEarnings(function(){});

            _httpMock.flush();

            expect(_element.scope().valoresTrimestre.length).toEqual(4);
            expect(_element.scope().valoresTrimestre[0]).toEqual(555);
            expect(_element.scope().valoresTrimestre[1]).toEqual(666);
            expect(_element.scope().valoresTrimestre[2]).toEqual(777);
            expect(_element.scope().valoresTrimestre[3]).toEqual(888);
            expect(_element.scope().valoresTrimestre[4]).toBeUndefined();
        })
    })
})