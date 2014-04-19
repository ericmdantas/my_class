"use strict";

myClass.factory('LoginService', ['$http', function($http)
{
    var URL = '/api/validateUser';

    function _validateUser(user)
    {
        return $http.post(URL, user);
    }

    return {
                validateUser: _validateUser
           }
}])