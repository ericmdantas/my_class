"use strict";

describe('NAVCONTROLLER BEING TESTED', function()
{
    var rootScope, scope, locationMock;
    var _validURLs = ['aulas', 'turmas', 'professores', 'alunos', 'livros', 'pagamentos', 'estatisticas'];

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        rootScope = $injector.get('$rootScope').$new();
        scope = rootScope;
        locationMock = $injector.get('$location');
    }))

    describe('checks all elements creation', function()
    {
        it('checks if controller was created', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});
            expect('NavController').toBeDefined();
        }))

        it('checks if items array was created', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});
            expect(scope.items).toBeDefined();
        }))

        it('checks if items array is populated', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});
            expect(scope.items.length).toBeGreaterThan(0);
        }))

        it('checks if items array is populated by objects', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});
            expect(typeof scope.items[0]).toEqual("object");
        }))
    })

    describe('active class/url', function()
    {
        it ('shouldn\'t exist any item active - wrong url', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/no_ecziste');
            });

            for (var i = 0; i < scope.items.length; i++)
            {
                expect(scope.items[i].active).toBe('');
            }
        }))

        it('should activate the right url', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            for (var i = 0; i < _validURLs.length; i++)
            {
                rootScope.$apply(function()
                {
                    locationMock.path('/' + _validURLs[i]);
                })

                expect(scope.items[i].active).toEqual('active');
            }
        }))
    })

    describe('change of title', function()
    {
        it('should change the title to principal - wrong url', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            var _wrongParams = ['//', '///', '...', function(){}, true, false, 0, 1, undefined, null, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                rootScope.$apply(function()
                {
                    locationMock.path('/' + _wrongParams[i]);
                })

                expect(document.title).toContain('principal');
            }
        }))

        it('should change the title correctly', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            for (var i = 0; i < _validURLs.length; i++)
            {
                rootScope.$apply(function()
                {
                    locationMock.path('/' + _validURLs[i]);
                });

                expect(document.title).toContain(_validURLs[i]);
            }
        }))
    })
})