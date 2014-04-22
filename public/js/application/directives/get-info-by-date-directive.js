"use strict";

myClass.directive('getInfoByDate', function()
{
    var temp = '<div class="select-data" align="center">'+
                   '<button type="button" class="btn btn-default btn-sm" ng-click="changeDate(\'months\', \'subtract\', 1)">&#171;</button>'+
                       '{{date | date: "MM/yyyy"}} '+
                   '<button type="button" class="btn btn-default btn-sm" ng-click="changeDate(\'months\', \'add\', 1)">&#187;</button>'+
               '</div>';

    //TODO GET THE REQUEST TO THE SERVER WORKING, THE DIRECTIVE SHOULD KNOW THE CONTROLLER METHOD TO BE CALLED

    return {
                scope: {getinfo: '&'},
                restrict: 'EA',
                template: temp,
                controller: 'GetInfoByDateController'
           }
})