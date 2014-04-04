"use strict";

myClass.controller('PaymentsController', ['$scope', '$http', 'pageConfig', function ($scope, $http, pageConfig)
{
    $scope.pagamentos = [];
    $scope.pagamentoEscolhido = {};
    $scope.isLoadingVisible = {modal: false};
    $scope.cfg = pageConfig;

    $http.get('/api/payments')
         .success(function(data)
                 {
                        $scope.pagamentos = (data && data.resultado) ? data.resultado : [];
                 })

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
        if ((!pagamento) || (typeof pagamento !== "object"))
            throw new Error('Não foi possível realizar o pagamento.');

        $scope.isLoadingVisible.modal = true;
        pagamento.name = pagamento.name ? pagamento.name.name : '';
        pagamento.class = pagamento.class ? pagamento.class.class : '';
        pagamento.paymentMonth = pagamento.paymentMonth ? pagamento.paymentMonth.nome : '';

        $http.post('/api/payments', pagamento)
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