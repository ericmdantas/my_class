"use strict";

myClass.factory('ClazzDayService', ['$http', function($http)
{
    var URL = '/api/classes/dailyInfo';

    function _getDailyInfo(monthAndYear)
    {
        return $http.get(URL + '/' + monthAndYear);
    }

    function _registerDailyInfo(moment)
    {
        return $http.post(URL, moment);
    }

    return {
                getDailyInfo: _getDailyInfo,
                registerDailyInfo: _registerDailyInfo
           }
}])