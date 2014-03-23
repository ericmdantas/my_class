"use strict";

describe('PLUSLESSINFO BEING TESTED', function()
{
    var scope, httpMock, compile, element, html;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        compile = $injector.get('$compile');
        html = '<plusLessInfoElement><span class="plus-less-info pull-right transition" data-toggle="collapse" data-target="#{{elementToToggle}}">{{symbol}}</span></plusLessInfoElement>';
        element = compile(html)(scope);
        scope.$digest();
    }));

    describe('checks elements creation in PLUS-LESS-INFO-ELEMENT', function()
    {
        it('checks if directive was created', function()
        {
            expect(element).toBeDefined();
        })

        it('checks if scope.symbol was created', function()
        {
            scope.$apply(function()
            {
                scope.symbol = '+';
            });

            expect(element[0].firstChild.innerText).toEqual('+');
        })

        it('checks if scope.elementToToggle was created', function()
        {
            scope.$apply(function()
            {
                scope.elementToToggle = 'some-element-to-toggle';
            });

            expect(element[0].firstChild.attributes[2].nodeValue).toEqual('#some-element-to-toggle');
        })
    })
})