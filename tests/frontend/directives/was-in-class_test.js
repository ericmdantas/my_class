"use strict";

describe('isOsDisc being tested', function()
{
    var scope, element, compile, html;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        scope = $injector.get('$rootScope').$new();
        compile = $injector.get('$compile');

        html = '<is-ok-disc class="is-ok-disc" ng-repeat="diaria in info.dailyInfo" situation="{{diaria.wasInClass}}" when="{{diaria.day}}">' +
                        "<span class=\"label\" ng-class=\"{{situation}} ? 'label-success' : 'label-danger'\">{{when}}</span>"+
                   '</is-ok-disc>';

        element = compile(angular.element(html))(scope);
        scope.$digest();
    }))

    describe('checks elements creation', function()
    {
        it('should have created element', function()
        {
            expect(element).toBeDefined();
        })
    })
})