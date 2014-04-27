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

        it('checks if logout was created', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
            expect(scope.logout).toBeDefined();
        }))
    })

    describe('userOnline', function()
    {
        it('checks if userOnline is empty when there\'s nothing in the localstorage', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
            expect(scope.userOnline()).toEqual('');
        }))

        it('checks if userOnline is equal to what\'s in the localStorage', inject(function($controller)
        {
            $controller('UserController', {$scope: scope});
            windowMock.localStorage.setItem('u', 'eric3');
            expect(scope.userOnline()).toEqual(', eric3');
        }))
    })

    describe('logout', function()
    {
        //TODO: ADD TESTS FOR LOGGING OUT
        //TODO: FIX Karma Error > Some of your tests did a full page reload!

        /*it('should log user out correctly', inject(function($controller)
        {
            windowMock.location = {};
            httpMock.expectPOST('/api/logout').respond();
            $controller('UserController', {$scope: scope});
            scope.logout();
            httpMock.flush();
        }))*/
    })
})