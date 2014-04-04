'use strict';

describe('interested students per month being tested', function()
{
    var httpMock, compile, scope, element;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        compile = $injector.get('$compile');
        httpMock.when('GET', '/api/interestedStudents/month').respond({});

        var html = '<interested-students-per-month>'
                       '<div class="info-card transition">'+
                           '<h3>interesse por mês</h3>'+
                           '<div id="pie-chart" class="chart" align="center"></div>'+
                       '</div>'+
                   '</interested-students-per-month>';

        element = compile(angular.element(html))(scope);
        scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if element exists', function()
        {
            expect(element).toBeDefined();
        })

        it('checks if the controller inside the directive was created', function()
        {
            expect(element.controller('interestedStudentsPerMonth')).toBeDefined();
        })

        it('checks if alunosInteressadosPorMes is defined', function()
        {
            expect(element.scope().alunosInteressadosPorMes).toBeDefined();
        })
    })
})