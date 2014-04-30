describe('USERCONTROLLER BEING TESTED', function()
{
    var scope, windowMock, locationMock, httpMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        windowMock = $injector.get('$window');
        locationMock = $injector.get('$location');
        httpMock = $injector.get('$httpBackend');
    }))

    afterEach(function()
    {
        windowMock.localStorage.removeItem('u');
    })

    describe('checks elements creation', function()
    {
        it('checks if the controller was created', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
            expect('UserController').toBeDefined();
        }))

        it('checks if the controller was created', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
            expect(scope.userOnline).toBeDefined();
        }))
    })

    describe('userOnline', function()
    {
        it('checks if userOnline is empty when there\'s nothing in the localstorage', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});

            var _wrongParams = [null, undefined, '   ', function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    scope.userOnline(_wrongParams[i]);
                }).toThrow('Não foi possível informar o usuário logado. Não há nada na sessão.');
            }
        }))

        it('checks if userOnline is equal to what\'s in the localStorage', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
            windowMock.localStorage.setItem('u', 'eric3');
            expect(scope.userOnline()).toEqual(', eric3');
        }))
    })
})