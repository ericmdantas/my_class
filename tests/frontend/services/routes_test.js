"use strict";

describe('configuration routes', function()
{
    beforeEach(module('myClass'));

    describe('checks elements creation', function()
    {
        it('should be defined', function()
        {
            expect(configuration.routes).toBeDefined();
            expect(typeof configuration.routes).toEqual('object');
        })

        it('should have 2 arguments as param', function()
        {
            expect(configuration.routes[0]).toEqual('$routeProvider');
            expect(configuration.routes[1]).toEqual('$locationProvider');
            expect(typeof configuration.routes[2]).toEqual('function');
            expect(configuration.routes[3]).toBeUndefined();
        })
    })
})