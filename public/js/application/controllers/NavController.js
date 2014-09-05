"use strict";

myClass.controller('NavController', ['$scope', '$http', '$window', 'lib',
                            function($scope, $http, $window, lib)
{
    $scope.usuarioLogado = $window.localStorage.getItem('u');

    $scope.logout = function(usuario)
    {
        if (lib.isStringInvalid(usuario))
            throw new Error('Não foi possível deslogar o usuário. O Parâmetro foi informado incorretamente.');

        $http
            .post('/api/logout', {user: usuario})
            .finally(function()
            {
                $window.location.replace('/');
            })
    }
}])