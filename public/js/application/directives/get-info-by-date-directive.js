"use strict";

myClass.directive('getInfoByDate', function()
{
    var temp = '<div class="select-data" align="center">'+
                   '<button type="button" class="btn btn-default btn-sm" ng-click="changeDate(\'months\', \'subtract\', 1)">&#171;</button>'+
                       ' {{date}} '+
                   '<button type="button" class="btn btn-default btn-sm" ng-click="changeDate(\'months\', \'add\', 1)">&#187;</button>'+
               '</div>';

    var ctrl = ['$scope', function($scope)
    {
        $scope.changeDate = function(tipoDePeriodo, metodo, quantidade)
        {
            var erroTipoPeriodo = (!tipoDePeriodo) || ("string" !== typeof tipoDePeriodo);
            var erroMetodo = (!metodo) || ("string" !== typeof metodo);
            var erroQuantidade = (!quantidade) || ("number" !== typeof quantidade) || (quantidade < 1);

            if (erroTipoPeriodo || erroMetodo || erroQuantidade)
                throw new Error('Parâmetros passados incorretamente no momento da mudança da data.');

            metodo = metodo.toLowerCase();

            $scope.date = moment()[metodo](tipoDePeriodo, quantidade).calendar();
        }

        $scope.date = moment().format('MM/YYYY');
    }]

    return {
                scope: {getinfo: '&'},
                restrict: 'EA',
                template: temp,
                controller: ctrl
           }
})