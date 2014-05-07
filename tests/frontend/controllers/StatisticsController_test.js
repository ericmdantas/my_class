describe('STATISTICSCONTROLLER BEING TESTED',function()
{
    var scope;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
    }))

    describe('checks elements creation', function()
    {
        it('should have cfg working', inject(function($controller)
        {
            $controller('StatisticsController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
            expect(typeof scope.cfg).toBe("object");
        }))
    })
})