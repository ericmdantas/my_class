"use strict";

myClass.factory('ClazzResource', ['$resource', 'baseAPI', function($resource, baseAPI)
{
    var _url = baseAPI + 'classes/:property/:id/:monthYear';
    var _params = {property: '@property', id: '@id', monthYear: '@monthYear'};
    var _methods = {update: {method: 'PUT'}};

    return $resource(_url, _params, _methods);
}])