"use strict";

describe('LoginService', function()
{
    var httpMock, LoginService;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        LoginService = $injector.get('LoginService');
    }))

    describe('checks elements creation', function()
    {
        it('checks if validateUser was created', function()
        {
            expect(LoginService.validateUser).toBeDefined();
            expect(typeof LoginService.validateUser).toEqual('function');
        })
    })

    describe('POST /api/validateUser', function()
    {
        it('should throw error - wrong user param', function()
        {
            var _wrongParams = [, null, undefined, [], {}, function(){}, true, false, ''];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){LoginService.validateUser(_wrongParams[i])})
                                              .toThrow(new Error('Não foi possível validar o usuário. Parâmetro errado.'));
            }
        })

        it('should validate user correctly', function()
        {
            httpMock.expectPOST('/api/validateUser').respond();
            var _user = {name: "usuario", password: "senha"};

            LoginService.validateUser(_user);
            httpMock.flush();
        })
    })
})