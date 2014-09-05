"use strict";

myClass.factory('Teacher', ['lib', function(lib)
{
    var DEFAULT_OBJECT =
    {
        _id: null,
        name: null,
        birthDate: null,
        salary: "0",
        address: null,
        admission: null,
        availability: null,
        email: null,
        mobilePhone: null,
        phone: null
    }

    var Teacher = function(opt)
    {
        var _opt = opt || DEFAULT_OBJECT;
        angular.extend(this, _opt);
    }

    Teacher.prototype =
    {
        isNew : function()
        {
            return (lib.isStringInvalid(this._id));
        },

        isInvalid : function()
        {
            var _invalidName = lib.isStringInvalid(this.name);
            var _invalidBirthDate = lib.isStringInvalid(this.birthDate);
            var _invalidSalary = lib.isNumberInvalid(parseInt(this.salary));

            return (_invalidName || _invalidBirthDate || _invalidSalary);
        }
    }

    return Teacher;
}])