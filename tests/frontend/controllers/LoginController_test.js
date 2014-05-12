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

        it('checks if the name of the button was created correctly', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});
            expect(scope.nomeBotao).toEqual('entrar');
        }))

        it('checks if sendingToServer was created with a false value', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});
            expect(scope.sendingToServer).toBeFalsy();
        }))
    })

    describe('checks if logging in with a wrong user is working', function()
    {
        it('tries to log in with an empty user', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _wrongParams = [undefined, null, function(){}, true, false, 0, 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    scope.validaUser(_wrongParams[i])
                }).toThrow(new Error('Usuário não informado.'));

                expect(scope.nomeBotao).toEqual('entrar');
            }
        }))

        it('tries to log in with a wrong user', inject(function($controller)
        {
            httpMock.expectPOST('/api/validateUser', {username: 'eric3', password: 'senha_errada'}).respond({user: "404"});
            $controller('LoginController', {$scope: scope});
            var user = {username: 'eric3', password: 'senha_errada'};
            scope.validaUser(user);
            httpMock.flush();

            expect(locationMock.path()).toBe('/');
            expect(scope.nomeBotao).toEqual('entrar');
        }))
    })

    describe('isItDisabled (button)', function()
    {
        it('should return true - wrong user param', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _wrongParams = [null, undefined, true, false, '   ', '', function(){}, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(scope.isItDisabled(_wrongParams[i])).toBeTruthy();
            }
        }))

        it('should return true - empty username', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _user = {username: '', password: '112233'};

            expect(scope.isItDisabled(_user)).toBeTruthy();
        }))

        it('should return true - empty password', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _user = {username: 'eric3', password: ''};

            expect(scope.isItDisabled(_user)).toBeTruthy();
        }))

        it('should return true - both user and password are empty', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _user = {username: '', password: ''};

            expect(scope.isItDisabled(_user)).toBeTruthy();
        }))

        it('should return false - correct valid informations', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _user = {username: 'acceptable', password: 'alsoAcceptable'};

            expect(scope.isItDisabled(_user)).toBeFalsy();
        }))
    })

    describe('validateInput', function()
    {
        it('should just return - wrong user param', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _wrongParams = [null, function(){}, true, false, 0, 1, {}, [], 'a', '  '];
            var _event = {keyCode: 13};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(scope.validateInput(_wrongParams[i], _event)).toBeUndefined();
            }
        }))

        it('should just return - wrong event param', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _user = {username: 'a123', password: '123'};
            var _wrongParams = [null, function(){}, true, false, 0, 1, {}, [], 'a', '  '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(scope.validateInput(_user, _wrongParams[i])).toBeUndefined();
            }
        }))

        it('should just return - wrong event param', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _user = {username: 'a123', password: '123'};
            var _wrongParams = [null, function(){}, true, false, 0, 1, {}, [], 'a', '  '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(scope.validateInput(_user, _wrongParams[i])).toBeUndefined();
            }
        }))

        it('shouldn\'t fetch anything to the server - wrong key pressed (12 was pressed instead of 13)', inject(function($controller)
        {
            $controller('LoginController', {$scope: scope});

            var _user = {username: 'a123', password: '123'};
            var _event = {keyCode: 12};

            scope.validateInput(_user, _event);
            expect(function(){httpMock.flush()}).toThrow(new Error('No pending request to flush !'));
        }))

        it('should validate user correctly - but he was not found', inject(function($controller)
        {
            httpMock.expectPOST('/api/validateUser').respond({user: "404"});
            $controller('LoginController', {$scope: scope});

            var _user = {username: 'a123', password: '123'};
            var _event = {keyCode: 13};

            scope.validateInput(_user, _event);
            httpMock.flush();
        }))
    })
})