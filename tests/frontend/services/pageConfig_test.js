"use strict";

describe('PAGECONFIG BEING TESTED', function()
{
    var pageConfig;

    beforeEach(module("myClass"));
    beforeEach(inject(function($injector)
    {
        pageConfig = $injector.get('pageConfig');
    }))

    describe('checks elements creation', function()
    {
        it('checks if pageConfig was created', function()
        {
            expect(pageConfig).toBeDefined();
        })

        it('checks if pageConfig.author was created', function()
        {
            expect(pageConfig.author).toBeDefined();
            expect(typeof pageConfig.author).toBeDefined("string");
        })

        it('checks if pageConfig.information was created', function()
        {
            expect(pageConfig.information).toBeDefined();
            expect(typeof pageConfig.information).toBe("object");
        })
    })

    describe('checks pageConfig\'s info', function()
    {
        it('the author should be eric mendes dantas', function()
        {
            expect(pageConfig.author).toEqual('eric mendes dantas');
        })
    })
})