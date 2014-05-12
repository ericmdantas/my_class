"use strict";

myClass.controller('LoginController', ['$scope', '$http', '$window', 'lib', 'pageConfig', 'LoginService',
                              function ($scope, $http, $window, lib, pageConfig, LoginService)
{
    $scope.user = {};
    $scope.user.username = $window.localStorage ? $window.localStorage.getItem('u') : '';
    $scope.cfg = pageConfig;
    $scope.nomeBotao = 'entrar';
    $scope.sendingToServer = false;

    var _idIntervalo = 0;

    $scope.validateInput = function(user, ev)
    {
        if (lib.isObjectInvalid(user) || lib.isObjectInvalid(ev))
            return;

        if (ev.keyCode === 13 && !$scope.isItDisabled(user))
            $scope.validaUser(user);
    }

    $scope.isItDisabled = function(user)
    {
        //TODO: CHECK THE POSSIBILITY TO TAKE THIS IDEA TO THE OTHER CONTROLLERS
        //TODO: MAYBE PUT IT IN A DIRECTIVE

        if (lib.isObjectInvalid(user))
            return true;

        return $scope.sendingToServer || !(!!user.username && !!user.password);
    }

    $scope.validaUser = function(user)
    {
        if (lib.isObjectInvalid(user))
            throw new Error('Usuário não informado.');

        _desabilitaBotao();
        $scope.sendingToServer = true;

        LoginService.validateUser(user)
             .success(function(data)
                      {
                          if (data.user === "ok")
                          {
                              $window.localStorage.setItem('u', user.username);
                              $window.location.href = '/principal';
                          }
                          else
                          {
                              $("#erroLogin").removeClass('hidden');
                              _reabilitaBotao();
                          }
                      })
             .error(function()
                    {
                        $("#erroLogin").removeClass('hidden');
                        _reabilitaBotao();
                    })
             .finally(function()
                    {
                        $scope.sendingToServer = false;
                    })

    }

    function _reabilitaBotao()
    {
        $('#username').focus();
        clearInterval(_idIntervalo);
        $scope.nomeBotao = 'entrar';
    }

    function _desabilitaBotao()
    {
        var _pontos = '';
        $scope.nomeBotao = 'carregando' + _pontos;

        _idIntervalo = setInterval(function()
                                  {
                                      if (_pontos.length > 3)
                                          _pontos = '';

                                      $scope.nomeBotao = 'carregando ' + _pontos;
                                      _pontos += '.';
                                  }, 555);
    }
}])