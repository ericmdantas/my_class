"use strict";

myClass.directive('getInfoByDate', function()
{
    var temp = '<div class="select-data" align="center">'+
                   '<label>mês/ano</label>'+
                   '<div class="row">'+
                       '<div>'+
                           '<div class="input-group">'+
                                '<input type="text" class="form-control" ng-model="date" maxlength="7">'+
                                '<span class="input-group-btn">'+
                                   '<button class="btn btn-default" type="button" ng-click="getinfo({date: date})">' +
                                        '<span class="glyphicon glyphicon-refresh"></span>'+
                                   '</button>'+
                                '</span>'+
                           '</div>'+
                       '</div>'+
                   '</div>'+
                '</div>';

    //TODO GET THE REQUEST TO THE SERVER WORKING, THE DIRECTIVE SHOULD KNOW THE CONTROLLER METHOD TO BE CALLED

    return {
                scope: {getinfo: '&'},
                restrict: 'EA',
                template: temp,
                controller: 'GetInfoByDateController'
           }
})