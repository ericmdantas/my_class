"use strict";

myClass.directive('toTheTop', ['$window', function($window)
{
    var _template = '<div class="to-the-top transition">'+
                            '<span class="glyphicon glyphicon-chevron-up"></span>'+
                    '</div>';

    var _link = function(scope, element, attrs)
    {
        $($window).scroll(function()
        {
            $window.scrollY < 100 ? element.fadeOut('slow') : element.fadeIn('slow');
        })

        element.on('click', function()
        {
            $window.scrollTo(0, 0);
        })
    }

    return {
                restrict: 'E',
                template: _template,
                link: _link
           }
}])