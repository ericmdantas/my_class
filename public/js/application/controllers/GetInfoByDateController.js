"use strict";

myClass.controller('GetInfoByDateController', ['$scope', '$http', 'lib', function($scope, $http, lib)
{
    $scope.date = '';

    $scope.setDate = function(data)
    {
        if (lib.isStringInvalid(data))
            throw new Error('Não foi possível formatar a data. Parâmetro passado incorretamente');

        $scope.date = data;
    }

    $scope.setDate(moment().format("MM/YYYY"));
}])