"use strict";

myClass.controller('GetInfoByDateController', ['$scope', '$http', 'lib', function($scope, $http, lib)
{
    $scope.date = '';

    $scope.changeDate = function(tipoDePeriodo, metodo, quantidade)
    {
        var erroTipoPeriodo = (lib.isStringInvalid(tipoDePeriodo));
        var erroMetodo = (lib.isStringInvalid(metodo));
        var erroQuantidade = (!quantidade) || ("number" !== typeof quantidade) || (quantidade < 1);

        if (erroTipoPeriodo || erroMetodo || erroQuantidade)
            throw new Error('Parâmetros passados incorretamente no momento da mudança da data.');

        metodo = metodo.toLowerCase();

        //TODO FIX THE DATE CHANGE SO IT ONLY SHOWS THE MONTH/YEAR

        $scope.date = moment($scope.date)[metodo](tipoDePeriodo, quantidade).calendar();
    }

    $scope.setDate = function(data)
    {
        if (lib.isStringInvalid(data))
            throw new Error('Não foi possível formatar a data. Parâmetro passado incorretamente');

        $scope.date = data;
    }

    $scope.setDate(moment().format());
}])