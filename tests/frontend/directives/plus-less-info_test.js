"use strict";

describe('PLUSLESSINFO BEING TESTED', function()
{
    var _scope, _compile, _element;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<plus-less-info-element elementToToggle="class-toggle-1">' +
                        '<span class="plus-less-info pull-right transition" data-toggle="collapse" data-target="#{{elementToToggle}}">{{symbol}}</span>' +
                    '</plus-less-info-element>';

        _element = angular.element(_html);

        _compile(_element)(_scope);
        _scope.$digest();
    }));

    describe('checks elements creation in', function()
    {
        it('checks if directive was created', function()
        {
            expect(_element).toBeDefined();
        })

        it('checks if directives is positioned correctly - should have pull-right class', function()
        {
            expect(_element.find('span').hasClass('pull-right')).toBeTruthy();
        })

        it('checks if directives is positioned correctly - should have transition class', function()
        {
            expect(_element.find('span').hasClass('transition')).toBeTruthy();
        })

        it('should have data-toggle attribute', function()
        {
            expect(_element.find('span').attr('data-toggle')).toEqual('collapse');
        })

        it('should have data-target attribute', function()
        {
            expect(_element.find('span').attr('data-target')).toContain('#');
        })

        it('checks if element to toggle is set correctly', function()
        {
            expect(_element.scope().elementToToggle).toEqual("class-toggle-1");
        })
    })

    describe('checks if click is working', function()
    {
        it('should get clicking to work', function()
        {
            _element.click();
        })
    })
})