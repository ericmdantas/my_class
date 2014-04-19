"use strict";

myClass.factory('StatisticService', ['$http', function($http)
{
    var URL_EARNINGS = '/api/earnings/trimester';
    var URL_INTERESTED_STUDENTS = '/api/interestedStudents/month';

    function _getEarnings()
    {
        return $http.get(URL_EARNINGS);
    }

    function _getInterestedStudents()
    {
        return $http.get(URL_INTERESTED_STUDENTS);
    }

    return {
        getEarnings: _getEarnings,
        getInterestedStudents: _getInterestedStudents
    }
}])