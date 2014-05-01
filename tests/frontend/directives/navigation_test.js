"use strict";

describe('navigation-directive', function()
{
    var _scope, _element, _compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');

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
    }))

    describe('checks elements creation', function()
    {
        it('should have classes navbar and navbar-fixed-top', function()
        {
            _scope.$digest();

            expect(_element.hasClass('navbar')).toBeTruthy();
            expect(_element.hasClass('navbar-fixed-top')).toBeTruthy();
            expect(_element.hasClass('navbar-default')).toBeTruthy();
        })

        //TODO: ADD MORE TESTS
    })
})