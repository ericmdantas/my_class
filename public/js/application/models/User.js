"use strict";

myClass.factory('User', ['lib', function(lib)
{
    var DEFAULT_OBJECT =
    {
        username: null,
        password: null,
        payment: false,
        type: null
    }

    var User = function(opt)
    {
        var _opt = opt || DEFAULT_OBJECT;
        angular.extend(this, _opt);
    }

    User.prototype =
    {
        isNew : function()
        {
            return (lib.isStringInvalid(this._id));
        },

        isInvalid : function()
        {
            return (lib.isStringInvalid(this.username) || lib.isStringInvalid(this.password));
        }
    }

    return User;
}])