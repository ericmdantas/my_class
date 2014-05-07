"use strict";

describe('navigation-directive', function()
{
    var _scope, _element, _compile, _locationMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _locationMock = $injector.get('$location');

        var _html = '<header class="navbar navbar-default navbar-fixed-top" role="navigation" >'+
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
                                    '<li ng-repeat="item in items track by $index" ' +
                                        'class="{{item.active}}"><a href="{{item.href}}" ng-cloak>{{item.nome}}</a>'+
                                    '</li>'+
                                '</ul>'+
                                '<ul class="nav navbar-nav navbar-right">'+
                                    '<li ng-click="logout(usuarioLogado)"><a href>sair</a></li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                    '</header>';

        _element = angular.element(_html);
        _compile(_element)(_scope);
        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('should have classes navbar and navbar-fixed-top', function()
        {
            expect(_element.hasClass('navbar')).toBeTruthy();
            expect(_element.hasClass('navbar-fixed-top')).toBeTruthy();
            expect(_element.hasClass('navbar-default')).toBeTruthy();
            expect(_element.find('ul li').hasClass('active')).toBeFalsy();
        })

        it('checks if the items are begin repeated', function()
        {
            _element.scope().items = [{nome: 'aulas', href: '/aulas', active: ''},
                                      {nome: 'turmas', href: '/turmas', active: ''},
                                      {nome: 'professores', href: '/professores', active: ''},
                                      {nome: 'alunos', href: '/alunos', active: ''},
                                      {nome: 'livros', href: '/livros', active: ''},
                                      {nome: 'pagamentos', href: '/pagamentos', active: ''},
                                      {nome: 'estatisticas', href: '/estatisticas', active: ''}];

            _scope.$digest();

            expect(_element.find('ul li').length).toEqual(8); // 7 items + sair
        })
    })
})