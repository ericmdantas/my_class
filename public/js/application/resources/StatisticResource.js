"use strict";

myClass.factory('StatisticResource', ['$resource', 'baseAPI', function($resource, baseAPI)
{
    var _url = baseAPI + ':graphic/:period';
    var _params = {};
    var _methods = {};

    return $resource(_url, _params, _methods);
}])