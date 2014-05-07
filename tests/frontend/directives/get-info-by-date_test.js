"use strict";

describe('getInfoByDate being tested', function()
{
    var _scope, _element, _compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<get-info-by-date getinfo="getClassesDailyInfo(date, turma._id)">'+
                        '<div class="select-data" align="center">'+
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
                        '</div>'+
                    '</get-info-by-date>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('element should be created', function()
        {
            expect(_element).toBeDefined();
        })

        it('checks if date is set correctly', function()
        {
            expect(_element.find('.form-control').val()).toEqual(moment().format('MM/YYYY'));
        })

        it('checks if the refreshing button is enabled at first', function()
        {
            expect(_element.scope().isItDisabled).toBeFalsy();
        })
    })

    describe('validations', function()
    {
        //TODO: ADD TESTS CHANGING THE DATE SO THE REFRESH BUTTON WILL BE DISABLED
    })
})