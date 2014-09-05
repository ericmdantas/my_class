"use strict";

myClass.factory('Clazz', ['$q', 'ClazzResource', 'ClazzDayResource', 'lib', function($q, ClazzResource, ClazzDayResource, lib)
{
    var DEFAULT_OBJECT =
    {
        name : null,
        time : null,
        students: []
    }

    var Clazz = function(opt)
    {
        var _opt = opt || DEFAULT_OBJECT;
        angular.extend(this, _opt);
    }

    Clazz.prototype =
    {
        isNew : function()
        {
            return (lib.isStringInvalid(this._id));
        },

        isInvalid: function ()
        {
            return lib.isStringInvalid(this.name) || (lib.isStringInvalid(this.time));
        }
    }

    return Clazz;
}])