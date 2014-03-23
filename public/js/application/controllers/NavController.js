"use strict";

myClass.controller('NavController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location)
{
    $scope.items = [{nome: 'turmas', href: '/turmas', active: ''}, {nome: 'professores', href: '/professores', active: ''}, {nome: 'alunos', href: '/alunos', active: ''},
                    {nome: 'livros', href: '/livros', active: ''}, {nome: 'pagamentos', href: '/pagamentos', active: ''}, {nome: 'estatísticas', href: '/estatisticas', active: ''}];

    $rootScope.$on('$locationChangeSuccess', function()
    {
        for (var i = 0; i < $scope.items.length; i++)
        {
            if ($location.path() === $scope.items[i].href)
            {
                removeActive($scope.items);
                $scope.items[i].active = 'active';
                trocaTitulo($scope.items[i].nome)
                return;
            }
        }

        trocaTitulo('principal');
        removeActive($scope.items);
    })

    function removeActive(array)
    {
        for (var i = 0; i < array.length; i++)
        {
            array[i].active = '';
        }
    }

    function trocaTitulo(novoTitulo)
    {
        document.title = 'my class | ' + novoTitulo;
    }
}])