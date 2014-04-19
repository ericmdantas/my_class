"use strict";

myClass.controller('PaymentsController', ['$scope', '$http', 'lib', 'pageConfig', 'PaymentService',
                                function ($scope, $http, lib, pageConfig, PaymentService)
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

    $scope.getPayments();

    function preparaAberturaModal(idModal)
    {
        $scope.isLoadingVisible.modal = false;
        $(idModal).modal('show');
    }

    function escondeModal(idModal)
    {
        $(idModal).modal('hide');
        $scope.isLoadingVisible.modal = false;
    }

    $scope.isHistoricoVisible = function(pagamento)
    {
        pagamento = pagamento || {};
        pagamento.payments = pagamento.payments || [];
        var quantidade = (pagamento.payments.length);

        return quantidade > 0 ? true : false;
    }

    $scope.openModalToRegisterPayment = function()
    {
        preparaAberturaModal('#modal-pay');
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
                         escondeModal('#modal-pay');
                     })

        for (var i = 0; i < $scope.pagamentos.length; i++)
        {
            if ($scope.pagamentos[i].name === pagamento.name)
                $scope.pagamentos[i].payments.push(pagamento);
        }

        $scope.alunoPagando = {};
    }
}])