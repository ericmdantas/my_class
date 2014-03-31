describe('STATISTICSCONTROLLER BEING TESTED',function()
{
    var scope;

    var consts =
    {
        CONTROLLER_NAME: 'StatisticsController'
    };

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
    }))
})