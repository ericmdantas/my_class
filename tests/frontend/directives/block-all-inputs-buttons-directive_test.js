"use strict";

describe('block-all-inputs-buttons-from-directive', function()
{
    var _scope, _element, _compile, _html;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

        _html =     '<div id="teste123">' +
                        '<input type="text" />' +
                        '<input type="number" />' +
                        '<input type="date" />' +
                        '<input type="time" />' +
                        '<input type="button" />' +
                        '<textarea></textarea>' +
                        '<button id="click-me" block-all-inputs-buttons-from="teste123"></button>' +
                    '</div>'

        _element = angular.element(_html);

        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('checks if the click is making everybody disabled for a certain amount of time', function()
    {
        it('should not disable anything, clicking everywhere but where the directive is', function()
        {
            var _wrongPlacesToClickShouldNotDisable = ['input', 'textarea', 'button'];

            for (var i = 0; i < _wrongPlacesToClickShouldNotDisable.length; i++)
            {
                expect(_element.find('#teste ' + _wrongPlacesToClickShouldNotDisable[i]).prop('disabled'))
                    .toBeUndefined();
            }
        })

        /* TODO: CHECK HOW TO TEST THIS

        it('should disable all the inputs when the click lands on the directive', function()
        {
            _element.find('#click-me').eq(0).click();

            console.log(_element.find('#teste123 input'))
            //expect(_element.find('#teste input').attr('disabled')).toEqual('disabled');
        })*/
    })
})