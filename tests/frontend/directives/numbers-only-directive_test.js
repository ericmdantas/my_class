"use strict";

describe('numbersOnly', function()
{
    var _scope, _element, _compile;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _scope.something = '123';
        _compile = $injector.get('$compile');

        var _html = '<input type="text" class="form-control" ng-model="something" numbers-only maxlength="10"/>';

        _element = angular.element(_html);

        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('element should be defined', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('checks if only numbers are allowed', function()
    {
        //TODO: FIX THE TEST WHERE THE USER INPUTS OTHER CARACTERS

        /*it('should let only numbers in the input', function()
        {
            _element.find('.form-control').val('a123');

            expect(_element.find('.form-control').val()).toEqual('123');
        })*/

        it('should display numbers correctly', function()
        {
            expect(_element.scope().something).toEqual('123');
        })
    })
})
