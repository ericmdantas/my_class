"use strict";

myClass.controller('GetInfoByDateController', ['$scope', 'lib', function($scope, lib)
{
    $scope.date = '';

    $scope.setDate = function(data)
    {
        if (lib.isStringInvalid(data))
            throw new Error('Não foi possível formatar a data. Parâmetro passado incorretamente');

        $scope.date = data;
    }
}])