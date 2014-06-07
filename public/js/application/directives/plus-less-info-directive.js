"use strict";

myClass.directive('plusLessInfoElement', function()
{
    var _temp = '<span class="plus-less-info pull-right transition" ' +
                       'data-toggle="collapse" ' +
                       'data-target="#{{elementToToggle}}">' +
                            '{{symbol}}' +
                '</span>';

    var _link = function(scope, elem, attrs)
    {
        scope.$watch("$index", function()
        {
            scope.elementToToggle = attrs.elementtotoggle;
        })

        elem.on('click', function()
        {
            scope.$apply(function()
            {
                if (!$('#'+scope.elementToToggle).hasClass('collapsing'))
                    scope.toggleSymbol();
            })
        })
    }

    var _controller = ['$scope', function($scope)
    {
        var SYMBOL_CLOSED = '+';
        var SYMBOL_OPENED = '–';

        $scope.symbol = SYMBOL_CLOSED;

        $scope.toggleSymbol = function()
        {
            $scope.symbol = ($scope.symbol === SYMBOL_OPENED) ? SYMBOL_CLOSED : SYMBOL_OPENED;
        }
    }];

    return {
                restrict: 'E',
                template: _temp,
                controller: _controller,
                link: _link
           }
})