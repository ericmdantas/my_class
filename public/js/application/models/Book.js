"use strict";

myClass.factory('Book', ['lib', function(lib)
{
    var DEFAULT_OBJECT =
    {
        name: null,
        quantity: 0,
        _id : null
    }

    var Book = function(opt)
    {
        var _opt = opt || DEFAULT_OBJECT;
        angular.extend(this, _opt);
    }

    Book.prototype =
    {
        isNew : function()
        {
            return (lib.isStringInvalid(this._id));
        },

        isInvalid : function()
        {
            return (lib.isStringInvalid(this.name) || lib.isNumberInvalid(this.quantity));
        }
    }

    return Book;
}])