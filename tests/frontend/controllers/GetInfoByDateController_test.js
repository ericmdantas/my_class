"use strict";

describe('GetInfoByDateController', function()
{
    var scope;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
    }))

    describe('checks elements creation', function()
    {
        it('checks is date was created and is empty', inject(function($controller)
        {
            $controller('GetInfoByDateController', {$scope: scope});
            expect(scope.date).toBeDefined();
            //expect(scope.date).toEqual(moment().format('MM/YYYY'));
        }))

        it('checks is setDate was created and is a function', inject(function($controller)
        {
            $controller('GetInfoByDateController', {$scope: scope});
            expect(scope.setDate).toBeDefined();
            expect(typeof scope.setDate).toEqual('function');
        }))
    })

    describe('setDate', function()
    {
        it('should throw exception - wrong date param', inject(function($controller)
        {
            $controller('GetInfoByDateController', {$scope: scope});

            var _wrongParams = ["", function(){}, true, false, 1, 0, [], {}];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){scope.setDate(_wrongParams[i])})
                    .toThrow(new Error('Não foi possível formatar a data. Parâmetro passado incorretamente'));
            }
        }))
    })
})