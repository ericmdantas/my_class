"use strict";

myClass.directive('historicoPagamento', [function()
{
    var _template = '<div ng-repeat="historico in pagamentos" class="payment transition">'+
                        '<button type="button" ' +
                                'class="btn btn-danger pull-right removedor"' +
                                'ng-click="deletePayment(historico, $index)">x</button>'+

                        '<h3>{{historico.paymentMonth}}</h3>'+
                        '<p class="text-almost-invisible">quantia: <span class="text-almost-black">{{historico.amountPaid}}</span></p>'+
                        '<p class="text-almost-invisible">forma de pagamento: <span class="text-almost-black">{{historico.paidWithWhat}}</span></p>'+
                        '<p class="text-almost-invisible">observação: <span class="text-almost-black">{{historico.observation}}</span></p>'+
                    '</div>';

    var _controller = ['$scope', 'lib', 'PaymentService', function($scope, lib, PaymentService)
    {
        $scope.deletePayment = function(historico, indice)
        {
            if (lib.isObjectInvalid(historico))
                throw new Error('Não é possível delegar o Pagamento escolhido. Objeto inválido.');

            var _payment = {studentName: $scope.aluno,
                            month: historico.paymentMonth,
                            amount: historico.amountPaid};

            var _onSuccess = function()
            {
                $scope.pagamentos.splice(indice, 1);
            }

            var _onError = function()
            {
                lib.createAlert(null, 'Houve um problema no momento da deleção do pagamento.');
            }

            PaymentService
                .remove(_payment)
                .then(_onSuccess, _onError);
        }
    }];

    var _scope = {pagamentos: '=', aluno: '@'};

    return {
                restrict: 'E',
                template: _template,
                controller: _controller,
                scope: _scope
           }
}])