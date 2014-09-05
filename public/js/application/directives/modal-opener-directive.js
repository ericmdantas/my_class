"use strict";

myClass.directive('modalOpener', ['ModalHelper', function(ModalHelper)
{
    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            ModalHelper.open(scope.open);
        })
    }

    var _scope = {open: '@modalOpener'};

    return {
                link: _link,
                scope: _scope
           }
}])