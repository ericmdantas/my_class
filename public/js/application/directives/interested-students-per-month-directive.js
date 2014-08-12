"use strict";

myClass.directive('interestedStudentsPerMonth', ['StatisticResource', function(StatisticResource)
{
    var _template = '<div class="info-card transition">' +
                        '<h3>interesse por mês</h3>' +
                        '<div id="pie-chart" class="chart" align="center"></div>' +
                    '</div>';

    var _ctrl = ['$scope', function($scope)
    {
        $scope.alunosInteressadosPorMes = [];

        $scope.getInterestedStudentsPerMonth = function(desenhaGrafico)
        {
            var _onSuccess = function(data)
            {
                if (!data)
                    return;

                var contadorMes = [];

                for (var i = 0; i < data.length; i++)
                {
                    data[i].porcentagem = (data[i].porcentagem >= 0) ? data[i].porcentagem : 0;

                    contadorMes = [data[i].nome, data[i].porcentagem];
                    $scope.alunosInteressadosPorMes.push(contadorMes);
                    contadorMes = [];
                }

                desenhaGrafico();
            };

            StatisticResource
                .query({graphic: 'interestedStudents', period: 'month'}, _onSuccess);
        }

        var _desenhaGrafico = function()
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

        $scope.getInterestedStudentsPerMonth(_desenhaGrafico);
    }]

    return {
                restrict: 'EA',
                template: _template,
                controller: _ctrl
           }
}])