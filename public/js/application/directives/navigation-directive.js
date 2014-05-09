"use strict";

myClass.directive('navigation', function()
{
    var _template = '<header class="navbar navbar-default navbar-fixed-top" role="navigation" >'+
                        '<div>'+
                            '<div class="navbar-header">'+
                                '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-header">'+
                                    '<span class="sr-only">Toggle navigation</span>'+
                                    '<span class="icon-bar"></span>'+
                                    '<span class="icon-bar"></span>'+
                                    '<span class="icon-bar"></span>'+
                                '</button>'+
                                '<a class="navbar-brand" href="/main">my class</a>'+
                            '</div>'+
                            '<div class="collapse navbar-collapse transition" id="nav-header">'+
                                '<ul class="nav navbar-nav">'+
                                    '<li><a href="/aulas" ng-cloak>aulas</a></li>'+
                                    '<li><a href="/turmas" ng-cloak>turmas</a></li>'+
                                    '<li><a href="/professores" ng-cloak>professores</a></li>'+
                                    '<li><a href="/alunos" ng-cloak>alunos</a></li>'+
                                    '<li><a href="/livros" ng-cloak>livros</a></li>'+
                                    '<li><a href="/pagamentos" ng-cloak>pagamentos</a></li>'+
                                    '<li><a href="/estatisticas" ng-cloak>estatisticas</a></li>'+
                                '</ul>'+
                                '<ul class="nav navbar-nav navbar-right">'+
                                    '<li ng-click="logout(usuarioLogado)"><a href>sair</a></li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                    '</header>';

    var _link = function(scope, element, attrs)
    {
        element.find('.navbar-brand').on('click', function()
        {
            element.find('li').removeClass('active');
            document.title = 'my class | principal';
        })

        element.find('#nav-header li').on('click', function()
        {
            element.find('li').removeClass('active');
            element.find(this).addClass('active');

            var _nomeLiClickado = element.find(this).text().trim();

            document.title = 'my class | ' + _nomeLiClickado;
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link,
                controller: 'NavController'
           }
})