"use strict";

myClass.controller('NavController', ['$rootScope', '$scope', '$location', '$http', '$window', 'lib',
                            function($rootScope, $scope, $location, $http, $window, lib)
{
    $scope.items = [{nome: 'aulas', href: '/aulas', active: ''},
                    {nome: 'turmas', href: '/turmas', active: ''},
                    {nome: 'professores', href: '/professores', active: ''},
                    {nome: 'alunos', href: '/alunos', active: ''},
                    {nome: 'livros', href: '/livros', active: ''},
                    {nome: 'pagamentos', href: '/pagamentos', active: ''},
                    {nome: 'estatisticas', href: '/estatisticas', active: ''}];

    $rootScope.$on('$locationChangeSuccess', function()
    {
        for (var i = 0; i < $scope.items.length; i++)
        {
            if ($location.path() === $scope.items[i].href)
            {
                _removeActive($scope.items);
                $scope.items[i].active = 'active';
                _trocaTitulo($scope.items[i].nome)
                return;
            }
        }

        _trocaTitulo('principal');
        _removeActive($scope.items);
    })

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

    function _removeActive(array)
    {
        for (var i = 0; i < array.length; i++)
        {
            array[i].active = '';
        }
    }

    function _trocaTitulo(novoTitulo)
    {
        document.title = 'my class | ' + novoTitulo;
    }
}])