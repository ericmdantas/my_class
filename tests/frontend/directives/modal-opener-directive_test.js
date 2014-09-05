"use strict";

describe('something-directive', function()
{
    var _scope, _element, _compile;
    var _ModalHelper;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _ModalHelper = $injector.get('ModalHelper');

        var _html = '<div id="abc"></div>' +
                    '<div modal-opener="#abc"></div>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('creation', function()
    {
        it('should have element created', function()
        {
            expect(_element).toBeDefined();
        })
    })

    describe('click', function()
    {
        it('should call the function on click', function()
        {
            spyOn(_ModalHelper, 'open').andCallThrough();
            _element.eq(1).click();

            expect(_ModalHelper.open).toHaveBeenCalledWith('#abc');
        })
    })
})