"use strict";

myClass.controller('LoginController', ['$scope', '$window', '$interval', 'lib', 'pageConfig', 'LoginService',
                              function ($scope, $window, $interval, lib, pageConfig, LoginService)
{
    $scope.user = {};
    $scope.user.username = $window.localStorage ? $window.localStorage.getItem('u') : '';
    $scope.cfg = pageConfig;
    $scope.nomeBotao = 'entrar';
    $scope.sendingToServer = false;
    $scope.usuarioNaoEncontrado = false;

    $scope.validateInput = function(user, ev)
    {
        if (lib.isObjectInvalid(user) || lib.isObjectInvalid(ev))
            return;

        if (ev.keyCode === 13)
            $scope.validaUser(user);

        if ($scope.usuarioNaoEncontrado)
            $scope.usuarioNaoEncontrado = false;
    }

    $scope.validaUser = function(user)
    {
        if (lib.isObjectInvalid(user))
            throw new Error('Usuário não informado.');

        $scope.sendingToServer = true;

        LoginService.validateUser(user)
             .success(function(data)
                      {
                          if (lib.isObjectInvalid(data) || lib.isStringInvalid(data.user) || data.user !== 'ok')
                          {
                              $scope.usuarioNaoEncontrado = true;
                              return;
                          }

                          $window.localStorage.setItem('u', user.username);
                          $window.location.href = '/principal';
                      })
             .error(function()
                    {
                        $scope.usuarioNaoEncontrado = true;
                    })
             .finally(function()
                    {
                        $scope.sendingToServer = false;
                    })

    }
}])