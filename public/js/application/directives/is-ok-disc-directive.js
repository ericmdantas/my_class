"use strict";

myClass.directive('isOkDisc', function()
{
    var temp = "<span class=\"label\" ng-class=\"{{situation}} ? 'label-success' : 'label-danger'\">{{when}}</span>";

    return {
                restrict: 'EA',
                template: temp,
                scope: {situation: '@', when: '@'}
           }
})