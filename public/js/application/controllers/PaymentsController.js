"use strict";

myClass.controller('PaymentsController', ['$scope', '$http', 'lib', 'pageConfig', 'PaymentService', 'ModalHelper',
                                function ($scope, $http, lib, pageConfig, PaymentService, ModalHelper)
{
    $scope.pagamentos = [];
    $scope.pagamentoEscolhido = {};
    $scope.isLoadingVisible = {modal: false};
    $scope.cfg = pageConfig;

    $scope.getPayments = function()
    {
        PaymentService.getPayments()
            .success(function(data)
            {
                $scope.pagamentos = (data && data.resultado) ? data.resultado : [];
            })
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

        $scope.isLoadingVisible.modal = true;

        pagamento.name = pagamento.name ? pagamento.name.name : '';
        pagamento.class = pagamento.class ? pagamento.class.class : '';
        pagamento.paymentMonth = pagamento.paymentMonth ? pagamento.paymentMonth.nome : '';

        PaymentService.registerPayment(pagamento)
             .success(function()
                     {
                         $scope.isLoadingVisible.modal = false;
                         ModalHelper.close('#modal-pay');
                         lib.emptyProperty($scope, 'alunoPagando', {});
                     })
             .finally(function()
                     {
                         for (var i = 0; i < $scope.pagamentos.length; i++)
                         {
                             if ($scope.pagamentos[i].name === pagamento.name)
                                 $scope.pagamentos[i].payments.push(pagamento);
                         }
                     })
    }

    $scope.isHistoricoVisible = function(pagamento)
    {
        if (lib.isObjectInvalid(pagamento))
            throw new Error('Não é possível exibir o histórico. Parâmetro passado incorretamente. Esperava um objeto.');

        var quantidade = (pagamento && pagamento.payments) ? pagamento.payments.length : 0;

        return quantidade > 0 ? true : false;
    }

    $scope.getPayments();
}])