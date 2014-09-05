var helper = (function()
{
    var _invalidObjects = function()
    {
        var _array = ['', null, undefined, {}, [], function(){}, true, false, 0, 1, ' ', 'a'];
        return _array;
    }

    var _invalidStrings = function()
    {
        var _array = ['', null, undefined, {}, [], function(){}, true, false, 0, 1, ' '];
        return _array;
    }

    var _invalidNumbers = function()
    {
        var _array = ['', null, undefined, {}, [], function(){}, true, false, ' '];
        return _array;
    }

    var _mockaWindow = function()
    {
        var _window =
        {
            location: {
                        href: '',
                        replace: function(param){}
                      },

            localStorage: {
                            getItem: function(){}
                          }
        }

        return _window;
    }

    return {
                invalidObjects: _invalidObjects,
                invalidStrings: _invalidStrings,
                invalidNumbers: _invalidNumbers,
                mockaWindow: _mockaWindow
           }
}())