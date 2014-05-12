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

    describe('GET /api/interestedStudents/month', function()
    {
        it('should work even if the server doesn\'t return anything', function()
        {
            _httpMock.expectGET('/api/interestedStudents/month').respond();
            _element.scope().getInterestedStudentsPerMonth(function(){});
            _httpMock.flush();

            expect(_element.scope().alunosInteressadosPorMes).toEqual([]);
        })

        it('should work even if the server doesn\'t return the full response', function()
        {
            _httpMock.expectGET('/api/interestedStudents/month').respond({resultado: []});
            _element.scope().getInterestedStudentsPerMonth(function(){});
            _httpMock.flush();

            expect(_element.scope().alunosInteressadosPorMes).toEqual([]);
        })

        it('should work even if the server doesn\'t return invalid percentage - should turn -1 into 0', function()
        {
            _httpMock.expectGET('/api/interestedStudents/month').respond({resultado: [{nome: 'Janeiro', porcentagem: -1}]});
            _element.scope().getInterestedStudentsPerMonth(function(){});
            _httpMock.flush();

            expect(_element.scope().alunosInteressadosPorMes[0]).toEqual(['Janeiro', 0]);
        })

        it('should work correctly when the server returns a small response', function()
        {
            _httpMock.expectGET('/api/interestedStudents/month').respond({resultado: [{nome: 'Janeiro', porcentagem: 10}]});
            _element.scope().getInterestedStudentsPerMonth(function(){});
            _httpMock.flush();

            expect(_element.scope().alunosInteressadosPorMes.length).toEqual(1);
            expect(_element.scope().alunosInteressadosPorMes[0]).toEqual(['Janeiro', 10]);
            expect(_element.scope().alunosInteressadosPorMes[1]).toBeUndefined();
        })

        it('should work correctly when the server returns the full response', function()
        {
            var _fullResponse = [{nome: 'Janeiro', porcentagem: 10},
                                 {nome: 'Fevereiro', porcentagem: 11},
                                 {nome: 'Março', porcentagem: 9},
                                 {nome: 'Abril', porcentagem: 5},
                                 {nome: 'Maio', porcentagem: 5},
                                 {nome: 'Junho', porcentagem: 15},
                                 {nome: 'Julho', porcentagem: 20},
                                 {nome: 'Agosto', porcentagem: 0},
                                 {nome: 'Setembro', porcentagem: 20},
                                 {nome: 'Outubro', porcentagem: 1},
                                 {nome: 'Novembro', porcentagem: 3},
                                 {nome: 'Dezembro', porcentagem: 6}];

            _httpMock.expectGET('/api/interestedStudents/month').respond({resultado: _fullResponse});
            _element.scope().getInterestedStudentsPerMonth(function(){});
            _httpMock.flush();

            expect(_element.scope().alunosInteressadosPorMes.length).toEqual(12);

            for (var i = 0; i < _fullResponse.length; i++)
            {

                expect(_element.scope().alunosInteressadosPorMes[i]).toEqual([_fullResponse[i].nome, _fullResponse[i].porcentagem]);
            }
        })
    })
})