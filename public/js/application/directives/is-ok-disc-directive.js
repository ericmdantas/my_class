"use strict";

myClass.directive('isOkDisc', function()
{
    var temp = '<span></span>';

    return {
                restrict: 'EA',
                template: temp,
                scope: {situation: '@', when: '@'}
           }
})