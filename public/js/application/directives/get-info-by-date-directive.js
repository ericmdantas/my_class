"use strict";

myClass.directive('getInfoByDate', ['lib', function(lib)
{
    var _chosenDate = _chosenDate || '';

    var temp = '<div class="select-data" align="center">'+
                   '<label>mês/ano</label>'+
                   '<div class="row">'+
                       '<div>'+
                           '<div class="input-group">'+
                                '<input type="text" class="form-control" ng-model="date" maxlength="7" />'+
                                '<span class="input-group-btn">'+
                                   '<button class="btn btn-default" type="button" ng-disabled="isItDisabled" ng-click="getinfo({date: date, id: id})">' +
                                        '<span class="glyphicon glyphicon-refresh"></span>'+
                                   '</button>'+
                                '</span>'+
                           '</div>'+
                       '</div>'+
                   '</div>'+
                '</div>';

    function _link(scope, element, attrs)
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
                controller: 'GetInfoByDateController'
           }
}])