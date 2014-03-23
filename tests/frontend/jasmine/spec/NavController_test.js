"use strict";

describe('NAVCONTROLLER BEING TESTED', function()
{
    var rootScope, scope, locationMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
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

    describe('checks if the url sniffing is working - checks classes', function()
    {
        it ('should activate the right url', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/no_existe');
            });

            for (var i = 0; i < scope.items.length; i++)
            {
                expect(scope.items[i].active).toBe('');
            }
        }))

        it ('should activate the right url - turmas', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/turmas');
            });

            expect(scope.items[0].active).toBe('active');
        }))

        it ('should activate the right url - turmas', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/professores');
            });

            expect(scope.items[1].active).toBe('active');
        }))

        it ('should activate the right url - alunos', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/alunos');
            });

            expect(scope.items[2].active).toBe('active');
        }))

        it ('should activate the right url - livros', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/livros');
            });

            expect(scope.items[3].active).toBe('active');
        }))

        it ('should activate the right url - pagamentos', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/pagamentos');
            });

            expect(scope.items[4].active).toBe('active');
        }))

        it ('should activate the right url - estatisticas', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/estatisticas');
            });

            expect(scope.items[5].active).toBe('active');
        }))
    })

    describe('checks if the document title is being changed', function()
    {
        it('should change the title to turmas', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/turmas');
            });

            expect(document.title).toContain('turmas');
        }))

        it('should change the title to professores', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/professores');
            });

            expect(document.title).toContain('professores');
        }))

        it('should change the title to turmas', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/alunos');
            });

            expect(document.title).toContain('alunos');
        }))

        it('should change the title to livros', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/livros');
            });

            expect(document.title).toContain('livros');
        }))

        it('should change the title to pagamentos', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/pagamentos');
            });

            expect(document.title).toContain('pagamentos');
        }))

        it('should change the title to estatisticas', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/estatisticas');
            });

            expect(document.title).toContain('estatísticas');
        }))

        it('should change the title to principal', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            rootScope.$apply(function()
            {
                locationMock.path('/url_que_nao_existe');
            });

            expect(document.title).toContain('principal');
        }))
    })
})