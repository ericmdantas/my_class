describe('USERCONTROLLER BEING TESTED', function()
{
    var scope, windowMock, locationMock;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        windowMock = $injector.get('$window');
        locationMock = $injector.get('$location');
    }))

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

        it('checks if logout was created', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
            expect(scope.logout).toBeDefined();
        }))
    })

    describe('checks business logic', function()
    {
        it('checks if logging out is working properly', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
        }))
    })
})