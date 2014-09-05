"use strict";

myClass.factory('Payment', ['lib', function(lib)
{
    var DEFAULT_OBJECT =
    {
        _id: null,
        name: null,
        paymentMonth: null,
        amountPaid: null,
        paidWithWhat: null,
        observation: null
    }

    var Payment = function(opt)
    {
        var _opt = opt || DEFAULT_OBJECT;
        angular.extend(this, _opt);
    }

    Payment.prototype =
    {
        isNew : function()
        {
            return (lib.isStringInvalid(this._id));
        },

        isInvalid : function()
        {
            return lib.isStringInvalid(this.name) ||
                   lib.isStringInvalid(this.paymentMonth) ||
                   lib.isNumberInvalid(parseFloat(this.amountPaid)) ||
                   lib.isStringInvalid(this.paidWithWhat);
        }
    }

    return Payment;
}])