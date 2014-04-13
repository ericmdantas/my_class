"use strict";

describe('getInfoByDate being tested', function()
{
    var scope, element, compile, html;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        compile = $injector.get('$compile');

        html = '<get-info-by-date getinfo="getClassesDailyInfo(date)"><' +
                   '<div class="select-data" align="center">'+
                        '<button type="button" class="btn btn-default btn-sm" ng-click="changeDate(\'months\', \'subtract\', 1)">&#171;</button>'+
                             ' {{date}} ' +
                        '<button type="button" class="btn btn-default btn-sm" ng-click="changeDate(\'months\', \'add\', 1)">&#187;</button>'+
                   '</div>'+
               '</get-info-by-date>';

        element = compile(angular.element(html))(scope);
        scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('element should be created', function()
        {
            expect(element).toBeDefined();
        })
    })

    describe('changing dates', function()
    {
        /*it('checks if adding advancing a month is working', function()
        {
            $controller('ClassesController', {$scope: scope})
            expect(scope.changeDate(moment().format('MM/YYYY'), 'add')).toBe(moment().add('months', 1).calendar());
        })

        it('checks if adding reducing a month is working', function()
        {
            $controller('ClassesController', {$scope: scope})
            expect(scope.changeDate(moment().format('MM/YYYY'), 'subtract')).toBe(moment().subtract('months', 1).calendar());
        })*/
    })
})