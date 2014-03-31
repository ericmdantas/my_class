"use strict";

describe('INTERCEPTOR BEING TESTED', function()
{
    beforeEach(module('myClass'));

    describe('checks elements creation', function()
    {
        it('configuration should be defined', function()
        {
            expect(configuration).toBeDefined();
            expect(typeof configuration).toEqual("object");
        })

        it('interceptors should be defined', function()
        {
            expect(configuration.interceptors).toBeDefined();
        })

        it('interceptor\'s first position should be $provide should be defined', function()
        {
            expect(configuration.interceptors[0]).toEqual('$provide');
        })

        it('interceptor\'s second position should be $httpProvider', function()
        {
            expect(configuration.interceptors[1]).toEqual('$httpProvider');
        })

        it('last position should be a function', function()
        {
            var ultimaPosicao = configuration.routes.length - 1;
            expect(typeof configuration.interceptors[ultimaPosicao]).toEqual('function');
        })
    })
})