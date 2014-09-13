"use strict";

myClass.directive('emdChangeLocationTo', ['$rootScope', '$window', '$location', function($rootScope, $window, $location)
{
    var _link = function(scope, element, attrs)
    {
        element.on('click', function()
        {
            if (!scope.changeTo)
                throw new Error('Não é possível trocar a localização. Caminho passado não é válido.');

            var _path = (scope.changeTo.substring(0, 1) === '/') ? scope.changeTo
                                                                 : '/' + scope.changeTo;

            if (scope.reloadWholePage === "true")
            {
                $window.location.href = _path;
            }
            else
            {
                $rootScope.$apply(function()
                {
                    $location.path(_path);
                })
            }
        })
    }

    var _scope = {reloadWholePage: '@', changeTo: '@emdChangeLocationTo'}

    return {
                restrict: 'A',
                scope: _scope,
                link: _link
           };
}])