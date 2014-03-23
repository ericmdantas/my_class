"use strict";

myClass.controller('MainController', ['$scope', '$http', '$location', '$interval', 'pageConfig', function ($scope, $http, $location, $interval, pageConfig)
{
    $scope.turmas = 0;
    $scope.professores = 0;
    $scope.alunos = 0;
    $scope.livros = 0;
    $scope.cfg = pageConfig;
    var TEMPO_ATUALIZACAO_CUMPRIMENTO = 60000; //1 minuto

    $http.get('/api/getUser/eric3')
         .success(function(data)
                  {
                        $scope.turmas = (data && data.resultado && data.resultado.classes) ? data.resultado.classes : 0;
                        $scope.professores = (data && data.resultado && data.resultado.teachers) ? data.resultado.teachers : 0;
                        $scope.alunos = (data && data.resultado && data.resultado.students) ? data.resultado.students : 0;
                        $scope.livros = (data && data.resultado && data.resultado.books) ? data.resultado.books : 0;
                  });

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