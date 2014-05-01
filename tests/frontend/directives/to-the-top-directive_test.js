"use strict";

describe('to-the-top-directive', function()
{
    var _element, _compile, _scope, _windowMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _windowMock = $injector.get('$window');

        var _html = '<div class="to-the-top transition">'+
                        '<span class="glyphicon glyphicon-chevron-up"></span>'+
                    '</div>';

        _element = angular.element(_html);
        _compile(_element)(_scope);
    }))

    describe('checks elements creation', function()
    {
        it('should have class transition', function()
        {
            _scope.$digest()
            expect(_element.hasClass('transition')).toBeTruthy();
            expect(_element.hasClass('to-the-top')).toBeTruthy();
        })

        it('should have class glyphcon', function()
        {
            _scope.$digest();

            expect(_element.find('span').hasClass('glyphicon')).toBeTruthy();
            expect(_element.find('span').hasClass('glyphicon-chevron-up')).toBeTruthy();
        })
    })


    //TODO: GET THE SCROLLING TEST TO WORK
    /*describe('checks if fading in and out is working', function()
    {
        it('should fade out', function()
        {
            _windowMock.scrollTo(0, 10);

            _scope.$digest();

            console.log(_windowMock.scrollY);

            expect(_element.hasClass('fadeOut')).toBeTruthy();
        })
    })*/
})