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
            _scope.$digest();

            expect(_element.find('ul li').length).toEqual(8); // 7 items + sair
        })
    })

    describe('active class on click', function()
    {
        it ('should have no li elements active - clicked on the brand', function()
        {
            _element.find('.navbar-brand').click();
            var _numLi = _element.find('.nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                expect(_element.find('.nav-header li').eq(i).hasClass('active')).toBeFalsy();
            }
        })

        it ('should have no li elements active - clicked somewhere else', function()
        {
            _element.find('.icon-bar').click();
            var _numLi = _element.find('.nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                expect(_element.find('.nav-header li').eq(i).hasClass('active')).toBeFalsy();
            }
        })

        it ('should set active to the correct li element', function()
        {
            var _numLi = _element.find('.nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                _element.find('.nav-header li').eq(i).click();

                if (_element.find('.nav-header li').eq(i).hasClass('nav-right'))
                    expect(_element.find('.nav-header li').eq(i).hasClass('active')).toBeFalsy();
                else
                    expect(_element.find('.nav-header li').eq(i).hasClass('active')).toBeTruthy();
            }
        })
    })

    describe('change of title', function()
    {
        it ('should have the title set to principal - clicked on the brand', function()
        {
            _element.find('.navbar-brand').click();

            var _numLi = _element.find('.nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                expect(document.title).toContain('principal');
            }
        })

        it ('should have no li elements active - clicked somewhere else', function()
        {
            _element.find('.icon-bar').click();

            var _numLi = _element.find('.nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                expect(document.title).toContain('principal');
            }
        })

        it ('should set active to the correct li element', function()
        {
            var _numLi = _element.find('.nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                _element.find('.nav-header li').eq(i).click();

                if (_element.find('.nav-header li').eq(i).hasClass('nav-right'))
                    expect(document.title).not.toContain(_element.find('.nav-header li').eq(i).text());
                else
                    expect(document.title).toContain(_element.find('.nav-header li').eq(i).text());
            }
        })
    })
})