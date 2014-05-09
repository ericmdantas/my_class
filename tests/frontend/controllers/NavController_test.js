"use strict";

describe('NAVCONTROLLER BEING TESTED', function()
{
    var rootScope, scope, locationMock, httpMock;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        rootScope = $injector.get('$rootScope').$new();
        scope = rootScope;
        locationMock = $injector.get('$location');
        httpMock = $injector.get('$httpBackend');
    }))

    describe('checks all elements creation', function()
    {
        it('checks if controller was created', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});
            expect('NavController').toBeDefined();
        }))

        it('checks if logout was created', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});
            expect(scope.logout).toBeDefined();
        }))
    })

    describe('logout', function()
    {
        it('should throw error - wrong param usuario', inject(function($controller)
        {
            $controller('NavController', {$scope: scope});

            var _wrongParams = [null, undefined, '   ', function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    scope.logout(_wrongParams[i]);
                }).toThrow(new Error('Não foi possível deslogar o usuário. O Parâmetro foi informado incorretamente.'));
            }
        }))

        //TODO: ADD SUCCESS TESTS
    })
})