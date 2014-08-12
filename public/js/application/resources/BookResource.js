"use strict";

myClass.factory('BookResource', ['$resource', 'baseAPI', function($resource, baseAPI)
{
    var _url = baseAPI + 'books/:id';
    var _params = {id: '@id'};
    var _methods = {update: {method: 'PUT'}};

    return $resource(_url, _params, _methods);
}])