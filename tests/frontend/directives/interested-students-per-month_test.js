'use strict';

describe('interested students per month being tested', function()
{
    var _httpMock, _compile, _scope, _element;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _compile = $injector.get('$compile');
        _httpMock.when('GET', '/api/interestedStudents/month').respond({});

        var _html = '<interested-students-per-month>'
                       '<div class="info-card transition">'+
                           '<h3>interesse por mês</h3>'+
                           '<div id="pie-chart" class="chart" align="center"></div>'+
                       '</div>'+
                   '</interested-students-per-month>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if element exists', function()
        {
            expect(_element).toBeDefined();
        })

        it('checks if the controller inside the directive was created', function()
        {
            expect(_element.controller('interestedStudentsPerMonth')).toBeDefined();
        })

        it('checks if alunosInteressadosPorMes is defined', function()
        {
            expect(_element.scope().alunosInteressadosPorMes).toBeDefined();
        })
    })

    describe('checks if getting the data from the server is working', function()
    {
        //TODO: ADD TESTS

        /*it('should work even if the server doesn\'t return anything', function()
        {

        })*/
    })
})