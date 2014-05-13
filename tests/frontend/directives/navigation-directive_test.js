"use strict";

describe('navigation-directive', function()
{
    var _scope, _element, _compile, _locationMock;
    var _activableURLs = ['aulas', 'turmas', 'professores', 'alunos', 'livros', 'pagamentos', 'estatisticas'];

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _locationMock = $injector.get('$location');

        var _html =  '<navigation>'
                        '<header class="navbar navbar-default navbar-fixed-top" role="navigation" >'+
                            '<div>'+
                                '<div class="navbar-header">'+
                                    '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-header">'+
                                        '<span class="sr-only">Toggle navigation</span>'+
                                        '<span class="icon-bar"></span>'+
                                        '<span class="icon-bar"></span>'+
                                        '<span class="icon-bar"></span>'+
                                    '</button>'+
                                    '<a class="navbar-brand" href>my class</a>'+
                                '</div>'+
                                '<div class="collapse navbar-collapse transition" id="nav-header">'+
                                    '<ul class="nav navbar-nav">'+
                                        '<li><a href ng-cloak>aulas</a></li>'+
                                        '<li><a href ng-cloak>turmas</a></li>'+
                                        '<li><a href ng-cloak>professores</a></li>'+
                                        '<li><a href ng-cloak>alunos</a></li>'+
                                        '<li><a href ng-cloak>livros</a></li>'+
                                        '<li><a href ng-cloak>pagamentos</a></li>'+
                                        '<li><a href ng-cloak>estatisticas</a></li>'+
                                    '</ul>'+
                                    '<ul class="nav navbar-nav navbar-right">'+
                                        '<li ng-click="logout(\'usuarioLogado\')"><a href>sair</a></li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                        '</header>'+
                     '</navigation>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('checks elements creation', function()
    {
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
            _element.find('.navbar-brand')[0].click();

            var _numLi = _element.find('#nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                expect(_element.find('#nav-header li').eq(i).hasClass('active')).toBeFalsy();
            }
        })

        it ('should have no li elements active - clicked somewhere else', function()
        {
            _element.find('.icon-bar')[0].click();

            var _numLi = _element.find('#nav-header li').length;

            for (var i = 0; i < _numLi; i++)
            {
                expect(_element.find('#nav-header li').eq(i).hasClass('active')).toBeFalsy();
            }
        })

        it ('should set active to the correct li element', function()
        {
            var _numLi = _element.find('#nav-header li').length - 1; //removes sair (logout)

            for (var i = 0; i < _numLi; i++)
            {
                _element.find('#nav-header li').eq(i).click();
                expect(_element.find('#nav-header li').eq(i).hasClass('active')).toBeTruthy();
            }
        })
    })

    describe('checks if li class is being active even if the user didn\'t click any link from the navigation', function()
    {
        it('should not add the class active - wrong url', function()
        {
            var _wrongURLs = ['/principal', '/abc', 'xyz', '/sair', 'sair'];
            var _liLength = _element.find('ul li').length;

            for (var i = 0; i < _wrongURLs.length; i++)
            {
                _locationMock.path(_wrongURLs[i]);

                for (var j = 0; j < _liLength; j++)
                {
                    expect(_element.find('ul li').eq(j).hasClass('active')).toBeFalsy();
                }
            }
        })

        /* TODO: FIX THE COMMENTED TEST, CHECK HOW TO TRIGGER THE ROUTECHANGESUCCESS

        it('should activate the right li', function()
        {
            var _li = _element.find('#nav-header li');

            for (var i = 0; i < _activableURLs.length; i++)
            {
                _scope.$apply(function()
                {
                    _locationMock.path('/'+_activableURLs[i]);

                    for (var j = 0; j < _li.length; j++)
                    {
                        if (_locationMock.path().replace('/', '') === _li.eq(j).text().trim())
                            expect(_li.eq(j).hasClass('active')).toBeTruthy();
                        else
                            expect(_li.eq(j).hasClass('active')).toBeFalsy();
                    }
                })

            }
        })*/
    })

    describe('change of title', function()
    {
        it ('should have the title set to principal - clicked on the brand', function()
        {
            _element.find('.navbar-brand')[0].click();
            expect(document.title).toContain('principal');
        })

        it ('should have no li elements active - clicked somewhere else', function()
        {
            _element.find('.icon-bar')[0].click();
            expect(document.title).toContain('principal');
        })

        it ('should set active to the correct li element', function()
        {
            var _numLi = _element.find('#nav-header li').length - 1; //remove sair (logout)

            for (var i = 0; i < _numLi; i++)
            {
                _element.find('#nav-header li').eq(i).click();
                expect(document.title).toContain(_element.find('#nav-header li').eq(i).text());
            }
        })
    })
})