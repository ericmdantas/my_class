"use strict";

myClass.controller('PaymentsController', ['$scope', 'lib', 'inputMaxLength', 'months', 'pageConfig', 'PaymentResource', 'ModalHelper',
                                function ($scope, lib, inputMaxLength, months, pageConfig, PaymentResource, ModalHelper)
{
    $scope.pagamentos = [];
    $scope.pagamentoEscolhido = {};
    $scope.inputMaxLength = inputMaxLength;
    $scope.isLoadingVisible = {modal: false};
    $scope.cfg = pageConfig;
    $scope.months = months;

    $scope.getPayments = function()
    {
        var _onSuccess = function(data)
        {
            $scope.pagamentos = data || [];
        };

        PaymentResource
            .query(_onSuccess);
    }

    $scope.openModalToRegisterPayment = function()
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-pay');
    }

    $scope.pay = function(pagamento)
    {
        if (lib.isObjectInvalid(pagamento))
            throw new Error('Não foi possível realizar o pagamento.');

        var _onSuccess = function()
        {
            $scope.isLoadingVisible.modal = false;
            ModalHelper.close('#modal-pay');
            lib.emptyProperty($scope, 'alunoPagando', {});

            for (var i = 0; i < $scope.pagamentos.length; i++)
            {
                if ($scope.pagamentos[i].name === pagamento.name)
                    $scope.pagamentos[i].payments.push(pagamento);
            }
        };

        $scope.isLoadingVisible.modal = true;

        pagamento.name = pagamento.name ? pagamento.name.name : '';
        pagamento.class = pagamento.class ? pagamento.class.class : '';
        pagamento.paymentMonth = pagamento.paymentMonth ? pagamento.paymentMonth.nome : '';

        PaymentResource
            .save(pagamento, _onSuccess, _onSuccess);
    }

    $scope.getPayments();
}])