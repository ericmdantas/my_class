describe('MAINCONTROLLER BEING TESTED', function()
{
    var _httpMock, _scope, _locationMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        _httpMock = $injector.get('$httpBackend');
        _scope = $injector.get('$rootScope').$new();
        _locationMock = $injector.get('$location');
    }))

    describe('elements creation', function()
    {
        it('checks if main controller is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: _scope});
            expect('MainController').toBeDefined();
        }))

        it('checks if _scope.getPeriodDay is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: _scope});
            expect(_scope.getPeriodDay).toBeDefined();
            expect(typeof _scope.getPeriodDay).toEqual("function");
        }))

        it('checks if _scope.cfg is defined', inject(function($controller)
        {
            $controller('MainController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }))

        it('should have the topicos set correctly', inject(function($controller)
        {
            $controller('MainController', {$scope: _scope});

            expect(_scope.topicos).toBeDefined();
            expect(_scope.topicos.length).toBeGreaterThan(5);
            expect(_scope.topicos.length).toBeLessThan(10);
            expect(typeof _scope.topicos).toBe('object');
        }))
    })

    describe('checks if getPeriodDay is working properly', function()
    {
        it('checks if getPeriodDay is returning values', inject(function($controller)
        {
            $controller('MainController', {$scope: _scope});
            expect(typeof _scope.getPeriodDay()).toBe("string");
        }))

        it('checks if the new Date().getHours is working', inject(function($controller)
        {
            $controller('MainController', {$scope: _scope});

            var hora = new Date().getHours();
            var manha = hora < 12;
            var tarde = hora >= 12 && hora < 18;

            var cumprimento = manha ? "Bom dia" : tarde ? "Boa tarde" : "Boa noite";

            expect(_scope.getPeriodDay()).toEqual(cumprimento);
        }))
    })
});