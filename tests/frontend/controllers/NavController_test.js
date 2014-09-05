"use strict";

describe('NAVCONTROLLER BEING TESTED', function()
{
    var _scope, _locationMock, _httpMock, _http;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _locationMock = $injector.get('$location');
        _httpMock = $injector.get('$httpBackend');
        _http = $injector.get('$http');
    }))

    describe('checks all elements creation', function()
    {
        it('checks if controller was created', inject(function($controller)
        {
            $controller('NavController', {$scope: _scope});
            expect('NavController').toBeDefined();
        }))

        it('checks if logout was created', inject(function($controller)
        {
            $controller('NavController', {$scope: _scope});
            expect(_scope.logout).toBeDefined();
        }))
    })

    describe('user in storage', function()
    {
        it('should have usuarioLogado set with info that was in storage', inject(function($controller)
        {
            window.localStorage.setItem('u', 'a123');
            $controller('NavController', {$scope: _scope});

            expect(_scope.usuarioLogado).toEqual('a123');
        }))
    })

    describe('logout', function()
    {
        it('should throw error - wrong param usuario', inject(function($controller)
        {
            $controller('NavController', {$scope: _scope});

            var _wrongParams = [null, undefined, '   ', function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.logout(_wrongParams[i]);
                }).toThrow(new Error('Não foi possível deslogar o usuário. O Parâmetro foi informado incorretamente.'));
            }
        }))

        it('post - server returns error', inject(function($controller)
        {
            _httpMock.expectPOST('/api/logout', {user: 'usuario'}).respond(500);
            $controller('NavController', {$scope: _scope, $window: helper.mockaWindow()});

            _scope.logout('usuario');
            _httpMock.flush();
        }))

        it('post successfully', inject(function($controller)
        {
            _httpMock.expectPOST('/api/logout', {user: 'usuario'}).respond(200);
            $controller('NavController', {$scope: _scope, $window: helper.mockaWindow()});

            _scope.logout('usuario');
            _httpMock.flush();
        }))
    })
})