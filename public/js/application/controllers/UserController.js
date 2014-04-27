"use strict";

myClass.controller('UserController', ['$scope', '$http', '$window', 'lib',
                              function($scope, $http, $window, lib)
{
    var _usuarioLogado;

    $scope.userOnline = function()
    {
        if (lib.isStringInvalid($window.localStorage.getItem('u')))
            return '';

        _usuarioLogado = $window.localStorage.getItem('u');

        return ', ' + _usuarioLogado;
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
             .finally(_redirecionaLogin)
    }

    function _redirecionaLogin()
    {
        $window.location.href = '/';
    }
}])