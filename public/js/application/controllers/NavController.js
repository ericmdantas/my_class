"use strict";

myClass.controller('NavController', ['$rootScope', '$scope', '$location', '$http', '$window', 'lib',
                            function($rootScope, $scope, $location, $http, $window, lib)
{
    $scope.usuarioLogado = $window.localStorage.getItem('u');

    $scope.logout = function(usuario)
    {
        if (lib.isStringInvalid(usuario))
            throw new Error('Não foi possível deslogar o usuário. O Parâmetro foi informado incorretamente.');

        _kickarSessao(usuario);
    }

    function _kickarSessao(usuario)
    {
        $http.post('/api/logout', {user: usuario})
            .finally(_redirecionaLogin)
    }

    function _redirecionaLogin()
    {
        $window.location.href = '/';
    }

    //TODO: PUT THIS INSIDE THE NAVIGATION DIRECTIVE?
}])