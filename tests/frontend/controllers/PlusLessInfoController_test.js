"use strict";

describe('PlusLessInfoController', function()
{
    var _scope, CLOSED_SYMBOL = '+', OPENED_SYMBOL = '–';

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
    }))

    describe('checks elements creation', function()
    {
        it('symbol should exist and should be waiting to be opened', inject(function($controller)
        {
            $controller('PlusLessInfoController', {$scope: _scope});

            expect(_scope.symbol).toBeDefined();
            expect(_scope.symbol).toEqual(CLOSED_SYMBOL);
        }))

        it('toggleSymbol should exist and be a function', inject(function($controller)
        {
            $controller('PlusLessInfoController', {$scope: _scope});

            expect(_scope.toggleSymbol).toBeDefined();
            expect(typeof _scope.toggleSymbol).toEqual('function');
        }))
    })

    describe('toggleSymbol', function()
    {
        it('should switch the symbols - was closed', inject(function($controller)
        {
            $controller('PlusLessInfoController', {$scope: _scope});

            _scope.symbol = CLOSED_SYMBOL;
            _scope.toggleSymbol();

            expect(_scope.symbol).toEqual(OPENED_SYMBOL);
        }))

        it('should switch the symbols - was opened', inject(function($controller)
        {
            $controller('PlusLessInfoController', {$scope: _scope});

            _scope.symbol = OPENED_SYMBOL;
            _scope.toggleSymbol();

            expect(_scope.symbol).toEqual(CLOSED_SYMBOL);
        }))
    })
})