"use strict";

myClass.factory('StudentResource', ['$resource', 'baseAPI', function($resource, baseAPI)
{
    var _url = baseAPI + 'students/:property/:id/:clazz';
    var _params = {id: '@id', property: '@property', clazz: '@clazz'};
    var _methods = {update: {method: 'PUT'},
                    getNames: {method: 'GET', isArray: true, url: baseAPI + 'students/name/:clazz'}};

    return $resource(_url, _params, _methods);
}])