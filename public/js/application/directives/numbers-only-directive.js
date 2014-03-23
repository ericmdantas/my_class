"use strict";

myClass.directive('numbersOnly', function()
{
    function l($scope, el, attr, model)
    {
        if (!model)
            return;

        var numberPattern = /[^0-9]/g;

        model.$parsers.push(function(inputValue)
        {
            var numeric = inputValue.replace(numberPattern, '');

            if (inputValue !== numeric)
            {
                model.$setViewValue(numeric);
                model.$render();
            }

            return numeric;
        });
    }

    return {
                restrict: 'A',
                require: '?ngModel',
                link: l
           }
})