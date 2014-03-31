"use strict";

myClass.directive('earningsStats', function()
{
    var temp = '<div class="info-card transition">'+
               '<h3>arrecadação por trimestre</h3>'+
               '<div id="column-chart" class="chart"></div>'+
               '</div>';

    var ctrl = ['$scope', '$http', function ($scope, $http)
    {
        $scope.valoresTrimestre = [];

        $http.get('/api/getEarningByTrimester')
             .success(function(data)
             {
                 if (!data || !data.resultado)
                     $scope.valoresTrimestre = [0, 0, 0, 0];
                 else
                 {
                     $scope.valoresTrimestre = [data.resultado.valorPrimeiroTrimestre,
                                                data.resultado.valorSegundoTrimestre,
                                                data.resultado.valorTerceiroTrimestre,
                                                data.resultado.valorQuartoTrimestre];
                 }

                 desenhaGrafico();
             })

        function desenhaGrafico()
        {
            $('#column-chart').highcharts(
                {
                    chart: {type: 'column'},
                    title: {text: undefined},
                    xAxis:
                    {
                        categories: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre'],
                        labels: {
                            rotation: -45,
                            style: {fontSize: '17px'}
                        }

                    },
                    yAxis: {min: 0, title: undefined},
                    tooltip:
                    {
                        headerFormat: '<span style="font-size:15px">{point.key}</span><table>',
                        pointFormat:  '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                      '<td style="padding:0"><b>R$ {point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: false,
                        useHTML: true
                    },
                    plotOptions: {column: {pointPadding: 0.2, borderWidth: 0}},
                    series:[{name: 'ganho', data: $scope.valoresTrimestre}]
                });
        }
    }]

    return {
                restrict: 'AE',
                template: temp,
                controller: ctrl
           }

})