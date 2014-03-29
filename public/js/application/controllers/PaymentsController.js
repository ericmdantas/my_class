"use strict";

myClass.controller('PaymentsController', ['$scope', '$http', 'pageConfig', function ($scope, $http, pageConfig)
{
    $scope.pagamentos = [];
    $scope.pagamentoEscolhido = {};
    $scope.isLoadingVisible = {modal: false};
    $scope.cfg = pageConfig;

    $http.get('/api/getPayments')
         .success(function(data)
                 {
                        $scope.pagamentos = (data && data.resultado) ? data.resultado : [];
                 })

    $scope.isHistoricoVisible = function(pagamento)
    {
        pagamento = pagamento || {};
        pagamento.payments = pagamento.payments || [];
        var quantidade = (pagamento.payments.length);

        return quantidade > 0 ? true : false;
    }

    $scope.openModalToRegisterPayment = function()
    {
        $scope.isLoadingVisible.modal = false;
        $('#modal-pay').modal({keyboard: true});
    }

    $scope.pay = function(pagamento)
    {
        if ((!pagamento) || (typeof pagamento !== "object"))
            throw new Error('Não foi possível realizar o pagamento.');

        $scope.isLoadingVisible.modal = true;
        pagamento.name = pagamento.name ? pagamento.name.name : '';
        pagamento.class = pagamento.class ? pagamento.class.class : '';
        pagamento.paymentMonth = pagamento.paymentMonth ? pagamento.paymentMonth.nome : '';

        $http.post('/api/registerPayment', pagamento)
             .success(function()
                     {
                         $scope.isLoadingVisible.modal = false;
                         $('#modal-pay').modal('hide');
                     })

        for (var i = 0; i < $scope.pagamentos.length; i++)
        {
            if ($scope.pagamentos[i].name === pagamento.name)
                $scope.pagamentos[i].payments.push(pagamento);
        }

        $scope.alunoPagando = {};
    }
}])