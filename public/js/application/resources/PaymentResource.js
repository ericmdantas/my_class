"use strict";

myClass.factory('PaymentResource', ['$resource', 'baseAPI', function($resource, baseAPI)
{
    var _url = baseAPI + 'students/payments';
    var _params = {};
    var _methods = {};

    return $resource(_url, _params, _methods);
}])