"use strict";

myClass.controller('PaymentsController', ['$scope', 'lib', 'inputMaxLength', 'months', 'pageConfig', 'Payment', 'PaymentService', 'ModalHelper',
                                function ($scope, lib, inputMaxLength, months, pageConfig, Payment, PaymentService, ModalHelper)
{
    $scope.alunoPagamento = new Payment();
    $scope.pagamentos = [];
    $scope.inputMaxLength = inputMaxLength;
    $scope.cfg = pageConfig;
    $scope.months = months;

    var _getPayments = function()
    {
        var _onSuccess = function(pagamentos)
        {
            $scope.pagamentos = pagamentos;
        };

        PaymentService
            .getAll()
            .then(_onSuccess);
    }

    $scope.pay = function(pagamento)
    {
        var _onSuccess = function()
        {
            _getPayments
            ModalHelper.close('#modal-pay');
        }

        pagamento.name = pagamento.name ? pagamento.name.name : '';
        pagamento.class = pagamento.class ? pagamento.class.class : '';
        pagamento.paymentMonth = pagamento.paymentMonth ? pagamento.paymentMonth.nome : '';

        PaymentService
            .save(pagamento)
            .then(_onSuccess);
    }

    _getPayments();
}])