"use strict";

myClass.directive('isOkDisc', function()
{
    var temp = '<span style="padding: 0 .2em; border-radius: 100%; background-color: red; margin: 0 1em;"></span>';

    return {
                restrict: 'EA',
                template: temp,
                scope: {situation: '@', when: '@'}
           }
})