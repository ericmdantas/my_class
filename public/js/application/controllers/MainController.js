"use strict";

myClass.controller('MainController', ['$scope', '$http', '$location', '$interval', 'pageConfig', function ($scope, $http, $location, $interval, pageConfig)
{
    $scope.cfg = pageConfig;
    var TEMPO_ATUALIZACAO_CUMPRIMENTO = 60000; //1 minuto

    $scope.redirectTo = function(url)
    {
        $location.path(url);
    }

    $scope.getPeriodDay = function()
    {
        var hora  = new Date().getHours();
        var manha = hora < 12;
        var tarde = (hora >= 12) && (hora < 18);

        return manha ? "Bom dia" : tarde ? "Boa tarde" : "Boa noite";
    }

    $interval($scope.getPeriodDay, TEMPO_ATUALIZACAO_CUMPRIMENTO || 60000);
}])