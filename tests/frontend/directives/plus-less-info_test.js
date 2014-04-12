"use strict";

describe('PLUSLESSINFO BEING TESTED', function()
{
    var scope, compile, element, html;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        compile = $injector.get('$compile');

        html = '<plusLessInfoElement>' +
                    '<span class="plus-less-info pull-right transition" data-toggle="collapse" data-target="#{{elementToToggle}}">{{symbol}}</span>' +
               '</plusLessInfoElement>';

        element = compile(angular.element(html))(scope);
        scope.$digest();
    }));

    describe('checks elements creation in PLUS-LESS-INFO-ELEMENT', function()
    {
        it('checks if directive was created', inject(function()
        {
            expect(element).toBeDefined();
        }))
    })
})