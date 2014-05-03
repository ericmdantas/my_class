"use strict";

myClass.controller('PlusLessInfoController', ['$scope', function($scope)
{
    var SYMBOL_CLOSED = '+';
    var SYMBOL_OPENED = '–';

    $scope.symbol = SYMBOL_CLOSED;

    $scope.toggleSymbol = function()
    {
        $scope.symbol = ($scope.symbol === SYMBOL_OPENED) ? SYMBOL_CLOSED : SYMBOL_OPENED;
    }
}])