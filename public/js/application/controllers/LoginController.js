"use strict";

myClass.controller('LoginController', ['$scope', '$http', '$window', 'lib', 'pageConfig', 'LoginService',
                              function ($scope, $http, $window, lib, pageConfig, LoginService)
{
    $scope.user = {};
    $scope.user.username = $window.localStorage ? $window.localStorage.getItem('u') : '';
    $scope.allUsers = {};
    $scope.cfg = pageConfig;
    var idIntervalo = 0;

    $scope.validaUser = function(user)
    {
        if (lib.isObjectInvalid(user))
            throw new Error('Usuário não informado.');

        desabilitaBotao();

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
                              reabilitaBotao();
                          }
                      })
             .error(function()
                    {
                        $("#erroLogin").removeClass('hidden');
                        reabilitaBotao();
                    })

    }

    function reabilitaBotao()
    {
        var btn_logar = $('#btnLogar');
        btn_logar.text('entrar');
        btn_logar.prop('disabled', false);
        $('#username').focus();
        clearInterval(idIntervalo);
    }

    function desabilitaBotao()
    {
        var pontos = '';
        var btn_logar = $('#btnLogar');
        btn_logar.text('carregando'+pontos);
        btn_logar.prop('disabled', true);

        idIntervalo = setInterval(function()
                                  {
                                      if (pontos.length > 3)
                                          pontos = '';

                                      btn_logar.text('carregando'+pontos);
                                      pontos += '.';
                                  }, 3333);
    }
}])