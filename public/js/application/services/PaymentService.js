"use strict";

myClass.factory('PaymentService', ['$http', function($http)
{
    var URL = '/api/students/payments';

    function _getPayments()
    {
        return $http.get(URL);
    }

    function _registerPayment(pagamento)
    {
        return $http.post(URL, pagamento);
    }

    return {
                getPayments: _getPayments,
                registerPayment: _registerPayment
           }
}])