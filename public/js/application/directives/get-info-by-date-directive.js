"use strict";

myClass.directive('getInfoByDate', ['lib', function(lib)
{
    var temp = '<div class="select-data" align="center" style="{{stuff}}">'+
                   '<label>mês/ano</label>'+
                   '<div class="row">'+
                       '<div>'+
                           '<div class="input-group">'+
                                '<input type="text" class="form-control" ng-model="date" maxlength="7" />'+
                                '<span class="input-group-btn">'+
                                   '<button class="btn btn-default" type="button" ng-disabled="{{isItDisabled}}" ng-click="getinfo({date: date, id: id})">' +
                                        '<span class="glyphicon glyphicon-refresh"></span>'+
                                   '</button>'+
                                '</span>'+
                           '</div>'+
                       '</div>'+
                   '</div>'+
                '</div>';

    //TODO: ADJUST THE DATE SO IT'LL DISPLAY THE DATE THE USER CHANGED TOO

    function _link(scope, element, attrs)
    {
        //TODO: ADJUST THE MONTHYEAR VALIDATION SO IT'LL DISABLE THE BUTTON WHEN THE INPUT IS INCORRECT
        //TODO: ADD TESTS

        //scope.stuff = "border: 1px solid red";

        /*scope.$watch('date', function()
        {
            scope.isItDisabled = lib.isMonthYearInvalid(scope.date);
        })*/

        scope.setDate(moment().format("MM/YYYY"));
    }

    return {
                scope: {getinfo: '&'},
                restrict: 'EA',
                template: temp,
                link: _link,
                controller: 'GetInfoByDateController'
           }
}])