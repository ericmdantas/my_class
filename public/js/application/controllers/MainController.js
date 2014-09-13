"use strict";

myClass.controller('MainController', ['$scope', '$location', '$interval', 'pageConfig', 'lib', 'topicos',
                             function ($scope, $location, $interval, pageConfig, lib, topicos)
{
    $scope.topicos = topicos;
    $scope.cfg = pageConfig;
    var TEMPO_ATUALIZACAO_CUMPRIMENTO = 60000; //1 minuto

    $scope.getPeriodDay = function()
    {
        var hora  = new Date().getHours();
        var manha = hora < 12;
        var tarde = (hora >= 12) && (hora < 18);

        return manha ? "Bom dia" : tarde ? "Boa tarde" : "Boa noite";
    }

    $interval($scope.getPeriodDay, TEMPO_ATUALIZACAO_CUMPRIMENTO || 60000);
}])