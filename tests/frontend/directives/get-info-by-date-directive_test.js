"use strict";

describe('getInfoByDate being tested', function()
{
    var _scope, _element, _compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<get-info-by-date getinfo="getClassesDailyInfo(date, turma._id)"></get-info-by-date>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if the controller was created', function()
        {
            expect(_element.controller('getInfoByDate')).toBeDefined();
        })

        it('checks if setDate was created', function()
        {
            expect(_element.isolateScope().setDate).toBeDefined();
            expect(typeof _element.isolateScope().setDate).toEqual('function');
        })

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
        it('should throw error, wrong params to set the date', function()
        {
            var _wrongParams = ["", function(){}, true, false, 1, 0, [], {}];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _element.isolateScope().setDate(_wrongParams[i])
                }).toThrow(new Error('Não foi possível formatar a data. Parâmetro passado incorretamente'));

            }
        })
    })
})