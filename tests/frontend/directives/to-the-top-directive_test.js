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

        var _html = '<to-the-top>'+
                        '<div class="to-the-top transition">'+
                            '<span class="glyphicon glyphicon-chevron-up"></span>'+
                        '</div>'+
                    '</to-the-top>';

        _element = angular.element(_html);
        _compile(_element)(_scope);
    }))

    describe('checks elements creation', function()
    {
        it('should have class transition', function()
        {
            _scope.$digest()
            expect(_element.find('div').hasClass('transition')).toBeTruthy();
            expect(_element.find('div').hasClass('to-the-top')).toBeTruthy();
        })

        it('should have class glyphcon', function()
        {
            _scope.$digest();

            expect(_element.find('span').hasClass('glyphicon')).toBeTruthy();
            expect(_element.find('span').hasClass('glyphicon-chevron-up')).toBeTruthy();
        })
    })


    describe('checks if the click is working', function()
    {
        it('should get the click to work', function()
        {
            _element.click();
        })
    })

    //TODO: GET THE SCROLLING TEST TO WORK
})