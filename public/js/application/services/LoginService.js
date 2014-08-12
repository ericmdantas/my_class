"use strict";

myClass.service('LoginService', ['$http', 'lib', function($http, lib)
{
    var URL = '/api/validateUser';

    function _validateUser(user)
    {
        if (lib.isObjectInvalid(user))
            throw new Error('Não foi possível validar o usuário. Parâmetro errado.');

        return $http.post(URL, user);
    }

    this.validateUser = _validateUser;
}])