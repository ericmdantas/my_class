"use strict";

myClass.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window)
{
    var usuarioLogado;

    $scope.userOnline = function()
    {
        usuarioLogado = $window.localStorage.getItem('u');
        return usuarioLogado ? ', '+ usuarioLogado : '';
    }

    $scope.logout = function()
    {
        kickarSessao();
    }

    $scope.toTheTop = function()
    {
        $window.scrollTo(0, 0);
    }

    function kickarSessao()
    {
        $http.post('/api/logout', {user: usuarioLogado})
             .success(function()
                      {
                          $window.location.href = '/';
                      })
    }
}])