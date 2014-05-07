"use strict";

myClass.directive('interestedStudentsPerMonth', ['StatisticService', function(StatisticService)
{
    var _template = '<div class="info-card transition">' +
                        '<h3>interesse por mês</h3>' +
                        '<div id="pie-chart" class="chart" align="center"></div>' +
                    '</div>';

    var _ctrl = ['$scope', '$http', function($scope, $http)
    {
        $scope.alunosInteressadosPorMes = [];

        StatisticService.getInterestedStudents()
             .success(function(data)
                      {
                            if (!data || !data.resultado)
                                return;

                            var contadorMes = [];

                            for (var i = 0; i < data.resultado.length; i++)
                            {
                                contadorMes = [data.resultado[i].nome, data.resultado[i].porcentagem];
                                $scope.alunosInteressadosPorMes.push(contadorMes);
                                contadorMes = [];
                            }

                            desenhaGrafico();
                      })

        function desenhaGrafico()
        {
            $('#pie-chart').highcharts({
                chart:
                {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {text: ''},
                tooltip: {pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'},
                plotOptions:
                {
                    pie:
                    {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        showInLegend: true,
                        dataLabels: {enabled: false}
                    }
                },
                series:
                    [{
                        type: 'pie',
                        name: 'porcentagem',
                        data: $scope.alunosInteressadosPorMes
                    }]
            });
        }
    }]

    return {
                restrict: 'EA',
                template: _template,
                controller: _ctrl
           }
}])