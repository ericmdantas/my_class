"use strict";

myClass.directive('blockAllInputsButtonsFrom', ['$timeout', function($timeout)
{
    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            var _id = '#' + attrs.blockAllInputsButtonsFrom;
            var _toDisable = _id + ' input, ' +
                             _id + ' textarea';

            $(_toDisable).prop('disabled', true);

            $timeout(function()
            {
                $(_toDisable).prop('disabled', false);
            }, 5555)
        })
    }

    return {
                restrict: 'A',
                link: _link
           }
}])