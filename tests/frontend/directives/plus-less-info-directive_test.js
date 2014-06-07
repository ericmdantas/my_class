"use strict";

describe('PLUSLESSINFO BEING TESTED', function()
{
    var _scope, _compile, _element;
    var CLOSED_SYMBOL = '+', OPENED_SYMBOL = '–';

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        var _html = '<plus-less-info-element elementToToggle="class-toggle-1"></pus-less-info-element>';

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

        it('checks if the controller was defined', function()
        {
            expect(_element.controller('plusLessInfoElement')).toBeDefined();
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

        it('symbol should exist and should be waiting to be opened', function()
        {
            expect(_element.scope().symbol).toBeDefined();
            expect(_element.scope().symbol).toEqual(CLOSED_SYMBOL);
        })

        it('toggleSymbol should exist and be a function', function()
        {
            expect(_element.scope().toggleSymbol).toBeDefined();
            expect(typeof _element.scope().toggleSymbol).toEqual('function');
        })
    })

    describe('controller', function()
    {
        it('should switch the symbols - was closed', function()
        {
            _element.scope().symbol = CLOSED_SYMBOL;
            _element.scope().toggleSymbol();

            expect(_element.scope().symbol).toEqual(OPENED_SYMBOL);
        })

        it('should switch the symbols - was opened', function()
        {
            _element.scope().symbol = OPENED_SYMBOL;
            _element.scope().toggleSymbol();

            expect(_element.scope().symbol).toEqual(CLOSED_SYMBOL);
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