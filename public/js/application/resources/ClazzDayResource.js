"use strict";

myClass.factory('ClazzDayResource', ['$resource', 'baseAPI', function($resource, baseAPI)
{
    var _url = baseAPI + 'classes/dailyInfo/:id/:monthAndYear';
    var _params = {id: '@id', monthAndYear: '@monthAndYear'};
    var _methods = {update: {method: 'PUT'}};

    return $resource(_url, _params, _methods);
}])