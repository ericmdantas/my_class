"use strict";

myClass.factory('TeacherResource', ['$resource', 'baseAPI', function($resource, baseAPI)
{
    var _url = baseAPI + 'teachers/:property/:id';
    var _params = {property: '@property', id: '@id'};
    var _methods = {update: {method: 'PUT'}};

    return $resource(_url, _params, _methods);
}])