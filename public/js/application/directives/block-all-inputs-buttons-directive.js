"use strict";

myClass.directive('blockAllInputsButtonsFrom', [function()
{
    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            var _id = '#' + attrs.blockAllInputsButtonsFrom;
            var _toDisable = _id + ' input, ' +
                             _id + ' button, ' +
                             _id + ' textarea';

            $(_toDisable).prop('disabled', 'disabled');

            setTimeout(function()
            {
                $(_toDisable).prop('disabled', '');
            }, 5555)
        })
    }

    return {
                restrict: 'A',
                link: _link
           }
}])