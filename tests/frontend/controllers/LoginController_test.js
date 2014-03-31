describe("LOGINCONTROLLER BEING TESTED", function()
{
    var scope, httpMock, locationMock, rootScope;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        rootScope = $injector.get('$rootScope').$new();
        scope = rootScope.$new();
        httpMock = $injector.get('$httpBackend');
        locationMock = $injector.get('$location');
        httpMock.when('POST', '/api/validateUser').respond();
    }))

    describe('elements creation', function()
    {
        it("logincontroller should be defined", inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});
            expect('LoginController').toBeDefined();
        }));

        it('checks if scope.user was created', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});
            expect(scope.user).toBeDefined();
        }))

        it('checks if scope.cfg was created', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }))

        it('checks if scope.validaUser was created', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});
            expect(scope.validaUser).toBeDefined();
            expect(typeof scope.validaUser).toBe('function');
        }))
    })

    describe('checks if logging in with a wrong user is working', function()
    {
        it('tries to log in with an empty user', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});
            expect(function(){scope.validaUser(undefined)}).toThrow(new Error('Usuário não informado.'));
            expect(function(){scope.validaUser(null)}).toThrow(new Error('Usuário não informado.'));
            expect(function(){scope.validaUser(false)}).toThrow(new Error('Usuário não informado.'));
            expect(function(){scope.validaUser(true)}).toThrow(new Error('Usuário não informado.'));
        }))

        it('tries to log in with a wrong user', inject(function($controller)
        {
            httpMock.expectPOST('/api/validateUser', {username: 'eric3', password: 'senha_errada'}).respond({user: "404"});
            $controller('LoginController', {$scope: scope});
            var user = {username: 'eric3', password: 'senha_errada'}
            scope.validaUser(user);

            rootScope.$apply(function()
            {
                locationMock.path('/');
            })

            httpMock.flush();

            expect(locationMock.path()).toBe('/');
        }))
    })
})