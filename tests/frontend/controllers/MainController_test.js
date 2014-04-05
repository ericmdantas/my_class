describe('MAINCONTROLLER BEING TESTED', function()
{
    var httpMock, scope, locationMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope').$new();
        locationMock = $injector.get('$location');
    }))

    describe('elements creation', function()
    {
        it('checks if main controller is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect('MainController').toBeDefined();
        }))

        it('checks if scope.getPeriodDay is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(scope.getPeriodDay).toBeDefined();
            expect(typeof scope.getPeriodDay).toEqual("function");
        }))

        it('checks if scope.cfg is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }))
    })

    describe('checks if clicking on the containers is changing the path correctly', function()
    {
        it('should keep the location on principal if nothing is the param is wrong', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});

            var wrongLocations = [undefined, null, '', [], true, false, [1,2], {}];

            for (var i = 0; i < wrongLocations.length; i++)
            {
                scope.$apply(function()
                {
                    scope.redirectTo(wrongLocations[i]);
                })

                expect(locationMock.path()).toEqual('/principal');
            }
        }))

        it('should redirect correctly', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            var correctLocations = ['aulas', 'turmas', 'professores', 'alunosz', 'livros', 'pagamentos', 'estatisticas'];

            for (var i = 0; i < correctLocations.length; i++)
            {
                scope.$apply(function()
                {
                    scope.redirectTo(correctLocations[i]);
                })

                expect(locationMock.path()).toEqual('/'+correctLocations[i]);
            }
        }))
    })

    describe('checks if getPeriodDay is working properly', function()
    {
        it('checks if getPeriodDay is returning values', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});
            expect(typeof scope.getPeriodDay()).toBe("string");
        }))

        it('checks if the new Date().getHours is working', inject(function($controller)
        {
            $controller('MainController', {$scope: scope});

            var hora = new Date().getHours();
            var manha = hora < 12;
            var tarde = hora >= 12 && hora < 18;

            var cumprimento = manha ? "Bom dia" : tarde ? "Boa tarde" : "Boa noite";

            expect(scope.getPeriodDay()).toEqual(cumprimento);
        }))
    })
});