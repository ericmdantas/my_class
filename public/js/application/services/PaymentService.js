"use strict";

myClass.factory('PaymentService', ['$http', 'lib', function($http, lib)
{
    var URL = '/api/students/payments';

    function _getPayments()
    {
        return $http.get(URL);
    }

    function _registerPayment(pagamento)
    {
        if (lib.isObjectInvalid(pagamento))
            throw new Error('Não é possível realizar o pagamento. Parâmetro PAGAMENTO passado de forma errada.');

        return $http.post(URL, pagamento);
    }

    return {
                getPayments: _getPayments,
                registerPayment: _registerPayment
           }
}])