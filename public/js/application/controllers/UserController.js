"use strict";

myClass.controller('UserController', ['$scope', '$window', 'lib',
                              function($scope, $window, lib)
{
    var _usuarioLogado = '';

    $scope.userOnline = function()
    {
        _usuarioLogado = $window.localStorage.getItem('u');

        if (lib.isStringInvalid(_usuarioLogado))
            throw new Error('Não foi possível informar o usuário logado. Não há nada na sessão.');

        return ', ' + _usuarioLogado;
    }
}])