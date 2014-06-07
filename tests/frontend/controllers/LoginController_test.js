describe("LOGINCONTROLLER BEING TESTED", function()
{
    var _scope, _httpMock, _locationMock, _intervalMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _locationMock = $injector.get('$location');
        _intervalMock = $injector.get('$interval');
        _httpMock.when('POST', '/api/validateUser').respond();
    }))

    describe('elements creation', function()
    {
        it("logincontroller should be defined", inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});
            expect('LoginController').toBeDefined();
        }));

        it('checks if _scope.user was created', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});
            expect(_scope.user).toBeDefined();
        }))

        it('checks if _scope.cfg was created', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }))

        it('checks if _scope.validaUser was created', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});
            expect(_scope.validaUser).toBeDefined();
            expect(typeof _scope.validaUser).toBe('function');
        }))

        it('checks if the name of the button was created correctly', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});
            expect(_scope.nomeBotao).toEqual('entrar');
        }))

        it('checks if sendingToServer was created with a false value', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});
            expect(_scope.sendingToServer).toBeFalsy();
        }))

        it('checks if the usuarioNaoEncontrado was created with false value', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});

            expect(_scope.usuarioNaoEncontrado).toBeDefined();
            expect(_scope.usuarioNaoEncontrado).toBeFalsy();
        }))
    })

    describe('POST /api/validateUser', function()
    {
        it('tries to log in with an empty user', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});

            var _wrongParams = [undefined, null, function(){}, true, false, 0, 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.validaUser(_wrongParams[i])
                }).toThrow(new Error('Usuário não informado.'));

                expect(_scope.nomeBotao).toEqual('entrar');
            }
        }))

        it('should flush the interval', inject(function($controller)
        {
            _httpMock.expectPOST('/api/validateUser', {username: "eric", password: 'senhaQualquer'}).respond({user: '404'});
            $controller('LoginController', {$scope: _scope});

            var _usuario = {username: 'eric', password: 'senhaQualquer'};

            _scope.validaUser(_usuario);
            _httpMock.flush();
            _intervalMock.flush(556);
        }))

        it('should change the usuarioNaoEncontrado property to true', inject(function($controller)
        {
            _httpMock.expectPOST('/api/validateUser', {username: "eric", password: 'senhaQualquer'}).respond({user: '404'});
            $controller('LoginController', {$scope: _scope});

            var _usuario = {username: 'eric', password: 'senhaQualquer'};

            _scope.validaUser(_usuario);
            _httpMock.flush();
            _intervalMock.flush(556);

            expect(_scope.usuarioNaoEncontrado).toBeTruthy();
        }))

        it('checks if the variable $scope.sendingToServer is being set to true when the function is called', inject(function($controller)
        {
            _httpMock.expectPOST('/api/validateUser', {username: 'a', password: 'b'}).respond();
            $controller('LoginController', {$scope: _scope});

            var _usuario = {username: 'a', password: 'b'};

            _scope.validaUser(_usuario);

            expect(_scope.sendingToServer).toBeTruthy();
            _httpMock.flush();
            expect(_scope.sendingToServer).toBeFalsy();
        }))

        it('tries to log in with a wrong user', inject(function($controller)
        {
            _httpMock.expectPOST('/api/validateUser', {username: 'eric3', password: 'senha_errada'}).respond({user: "404"});
            $controller('LoginController', {$scope: _scope});
            var user = {username: 'eric3', password: 'senha_errada'};
            _scope.validaUser(user);
            _httpMock.flush();

            expect(_locationMock.path()).toBe('/');
            expect(_scope.nomeBotao).toEqual('entrar');
        }))

        it('tries to log in with a server error', inject(function($controller)
        {
            _httpMock.expectPOST('/api/validateUser', {username: 'eric3', password: 'senha_errada'}).respond(500, {someError: 'here'});
            $controller('LoginController', {$scope: _scope});
            var user = {username: 'eric3', password: 'senha_errada'};
            _scope.validaUser(user);
            _httpMock.flush();

            expect(_locationMock.path()).toBe('/');
            expect(_scope.nomeBotao).toEqual('entrar');
            expect(_scope.usuarioNaoEncontrado).toBeTruthy();
        }))
    })

    describe('validateInput', function()
    {
        it('should just return - wrong user param', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});

            var _wrongParams = [null, function(){}, true, false, 0, 1, {}, [], 'a', '  '];
            var _event = {keyCode: 13};

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(_scope.validateInput(_wrongParams[i], _event)).toBeUndefined();
            }
        }))

        it('should just return - wrong event param', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});

            var _user = {username: 'a123', password: '123'};
            var _wrongParams = [null, function(){}, true, false, 0, 1, {}, [], 'a', '  '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(_scope.validateInput(_user, _wrongParams[i])).toBeUndefined();
            }
        }))

        it('should just return - wrong event param', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});

            var _user = {username: 'a123', password: '123'};
            var _wrongParams = [null, function(){}, true, false, 0, 1, {}, [], 'a', '  '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(_scope.validateInput(_user, _wrongParams[i])).toBeUndefined();
            }
        }))

        it('shouldn\'t fetch anything to the server - wrong key pressed (12 was pressed instead of 13)', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});

            var _user = {username: 'a123', password: '123'};
            var _event = {keyCode: 12};

            _scope.validateInput(_user, _event);
            expect(function(){_httpMock.flush()}).toThrow(new Error('No pending request to flush !'));
        }))

        it('should validate user correctly - but he was not found', inject(function($controller)
        {
            _httpMock.expectPOST('/api/validateUser').respond({user: "404"});
            $controller('LoginController', {$scope: _scope});

            var _user = {username: 'a123', password: '123'};
            var _event = {keyCode: 13};

            _scope.validateInput(_user, _event);
            _httpMock.flush();
        }))

        it('should set usuarioNaoEncontrado to false - since the user is trying to log in again', inject(function($controller)
        {
            $controller('LoginController', {$scope: _scope});

            var _user = {username: 'a123', password: '123'};
            var _event = {keyCode: 10};

            expect(_scope.usuarioNaoEncontrado).toBeFalsy();
            _scope.usuarioNaoEncontrado = true;
            _scope.validateInput(_user, _event);
            expect(_scope.usuarioNaoEncontrado).toBeFalsy();
        }))
    })
})