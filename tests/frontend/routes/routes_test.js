"use strict";

describe('ROUTES BEING TESTED', function()
{
    beforeEach(module('myClass'));

    describe('checks elements creation', function()
    {
        it('configuration should be defined', function()
        {
            expect(configuration).toBeDefined();
            expect(typeof configuration).toEqual("object");
        })

        it('routes should be defined', function()
        {
            expect(configuration.routes).toBeDefined();
        })

        it('routes[0] should equal locationProvider', function()
        {
            expect(configuration.routes[0]).toEqual('$routeProvider');
        })

        it('routes[1] should equal locationProvider', function()
        {
            expect(configuration.routes[1]).toEqual('$locationProvider');
        })

        it('last position should be a function', function()
        {
            var ultimaPosicao = configuration.routes.length - 1;
            expect(typeof configuration.routes[ultimaPosicao]).toEqual('function');
        })
    })
})