"use strict";

describe('getInfoByDate being tested', function()
{
    var scope, element, compile, html;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        compile = $injector.get('$compile');

        html = '<div class="select-data" align="center">'+
                    '<label>mês/ano</label>'+
                    '<div class="row">'+
                        '<div>'+
                            '<div class="input-group">'+
                                '<input type="text" class="form-control" ng-model="date" maxlength="7" />'+
                                '<span class="input-group-btn">'+
                                    '<button class="btn btn-default" type="button" ng-disabled="isItDisabled" ng-click="getinfo({date: date, id: id})">' +
                                        '<span class="glyphicon glyphicon-refresh"></span>'+
                                    '</button>'+
                                '</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';

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
})