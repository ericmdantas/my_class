"use strict";

myClass.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window)
{
    var _usuarioLogado;

    $scope.userOnline = function()
    {
        _usuarioLogado = $window.localStorage.getItem('u');
        return _usuarioLogado ? ', '+ _usuarioLogado : '';
    }

    $scope.logout = function()
    {
        _kickarSessao();
    }

    $scope.toTheTop = function()
    {
        $window.scrollTo(0, 0);
    }

    function _kickarSessao()
    {
        $http.post('/api/logout', {user: _usuarioLogado})
             .finally(redirecionaLogin)
    }

    function redirecionaLogin()
    {
        $window.location.href = '/';
    }
}])