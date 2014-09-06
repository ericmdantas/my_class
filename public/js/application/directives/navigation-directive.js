"use strict";

myClass.directive('navigation', ['$rootScope', '$location', function($rootScope, $location)
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
                                '<a class="navbar-brand">my class</a>'+
                            '</div>'+
                            '<div class="collapse navbar-collapse transition" id="nav-header">'+
                                '<ul class="nav navbar-nav">'+
                                    '<li class="activable"><a href ng-cloak>aulas</a></li>'+
                                    '<li class="activable"><a href ng-cloak>turmas</a></li>'+
                                    '<li class="activable"><a href ng-cloak>professores</a></li>'+
                                    '<li class="activable"><a href ng-cloak>alunos</a></li>'+
                                    '<li class="activable"><a href ng-cloak>livros</a></li>'+
                                    '<li class="activable"><a href ng-cloak>pagamentos</a></li>'+
                                    '<li class="activable"><a href ng-cloak>estatisticas</a></li>'+
                                '</ul>'+
                                '<ul class="nav navbar-nav navbar-right">'+
                                    '<li ng-click="logout(usuarioLogado)"><a href>sair</a></li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                    '</header>';

    var _link = function(scope, element, attrs)
    {
        var _nomeLiClickado = '';

        document.title = 'my class | principal';

        $rootScope.$on('$locationChangeSuccess', function()
        {
            var _li = element.find('#nav-header li');
            var _title = null;

            for (var i = 0; i < _li.length; i++)
            {
                if ($location.path().replace('/', '') === _li.eq(i).text().trim())
                {
                    _li.removeClass('active');
                    _li.eq(i).addClass('active');
                    _title = _li.eq(i).text().trim();
                    break;
                }
            }

            _title = 'my class | ' + (_title) ? _title : 'principal';
            document.title = _title;
        })

        element.find('.navbar-brand').on('click', function()
        {
            element.find('#nav-header li').removeClass('active');

            scope.$apply(function()
            {
                $location.path('/principal');
            })

            document.title = 'my class | principal';
        })

        element.find('#nav-header li.activable').on('click', function()
        {
            element.find('#nav-header li.activable').removeClass('active');
            element.find(this).addClass('active');

            _nomeLiClickado = element.find(this).text().trim();

            scope.$apply(function()
            {
                $location.path('/' + _nomeLiClickado);
            })

            document.title = 'my class | ' + _nomeLiClickado;
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link,
                controller: 'NavController'
           }
}])