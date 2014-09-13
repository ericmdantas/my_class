"use strict";

describe('location-changer-directive', function()
{
    var _scope, _element, _compile, _windowMock;

    beforeEach(module('myClass', function($provide)
    {
        $provide.constant('$window', helper.mockaWindow());
    }));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _windowMock = $injector.get('$window');
    }))

    describe('error', function()
    {
        beforeEach(function()
        {
            var _html = '<div emd-change-location-to></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();
        })

        it('should throw an error - no path specified', function()
        {
            expect(function()
            {
                _element.click();
            }).toThrow(new Error('Não é possível trocar a localização. Caminho passado não é válido.'));
        })
    })

    describe('success', function()
    {
        it('should change the location correctly - hue', function()
        {
            var _html = '<div emd-change-location-to="hue"></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            _element.click();
            expect(_windowMock.location.href).toEqual('/hue');
        })

        it('should change the location correctly - /hue', function()
        {
            var _html = '<div emd-change-location-to="/hue"></div>';

            _element = angular.element(_html);
            _compile(_element)(_scope);

            _scope.$digest();

            _element.click();
            expect(_windowMock.location.href).toEqual('/hue');
        })
    })
})