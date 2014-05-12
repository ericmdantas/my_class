"use strict";

myClass.directive('getInfoByDate', ['lib', function(lib)
{
    var _chosenDate = _chosenDate || '';

    var temp = '<div class="select-data" align="center">'+
                   '<label>mês/ano</label>'+
                   '<div class="row">'+
                       '<div>'+
                           '<div class="input-group">'+
                                '<input type="text" class="form-control" ng-model="date" maxlength="7" placeholder="MM/YYYY"/>'+
                                '<span class="input-group-btn">'+
                                   '<button class="btn btn-default" type="button" ng-disabled="isItDisabled" ng-click="getinfo({date: date, id: id})">' +
                                        '<span class="glyphicon glyphicon-refresh"></span>'+
                                   '</button>'+
                                '</span>'+
                           '</div>'+
                       '</div>'+
                   '</div>'+
                '</div>';

    var _controller = ['$scope', 'lib', function($scope, lib)
    {
        $scope.date = '';

        $scope.setDate = function(data)
        {
            if (lib.isStringInvalid(data))
                throw new Error('Não foi possível formatar a data. Parâmetro passado incorretamente');

            $scope.date = data;
        }
    }];

    var _link = function(scope, element, attrs)
    {
        scope.$watch('date', function()
        {
            scope.isItDisabled = lib.isMonthYearInvalid(scope.date);
            _chosenDate = scope.date;
        })

        scope.setDate(_chosenDate || moment().format("MM/YYYY"));
    }

    return {
                scope: {getinfo: '&'},
                restrict: 'EA',
                template: temp,
                link: _link,
                controller: _controller
           }
}])