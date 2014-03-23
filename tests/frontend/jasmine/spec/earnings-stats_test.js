"use strict";

describe('EARNINGSTATS BEING TESTED', function()
{
    var scope, template, element, httpMock, compile;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        httpMock = $injector.get('$httpBackend');
        compile = $injector.get('$compile');
        template = '<earnings-stats></earnings-stats>';
        element = compile(template)(scope);
        httpMock.when('GET', '/api/getEarningByTrimester?u=eric3')
                .respond({});
        scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('checks if directive was created', function()
        {
            expect(element).toBeDefined();
        })

        it('checks the controller', function()
        {
            expect(element.controller('earningsStats')).toBeDefined();
        })

        it('checks the controller', function()
        {
            expect(element.scope().valoresTrimestre).toBeDefined();
            expect(typeof element.scope().valoresTrimestre).toEqual("object");
        })
    })
})