"use strict";

describe('PAYMENTSCONTROLLER BEING TESTED', function()
{
    var httpMock, scope;

    beforeEach(module('myClass'))

    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        scope = $injector.get('$rootScope').$new();
        httpMock.when('GET', '/api/students/payments').respond();
        httpMock.when('POST', '/api/students/payments', undefined).respond();
    }))

    describe('checks elements creation', function()
    {
        it('checks if the controller was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            expect('PaymentsController').toBeDefined();
        }))

        it('checks if the pagamentos object was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            expect(scope.pagamentos).toBeDefined();
        }))

        it('checks if the pagamentoEscolhido object was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            expect(scope.pagamentoEscolhido).toBeDefined();
        }))

        it('checks if the pagamentoEscolhido object was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            expect(scope.pagamentoEscolhido).toBeDefined();
        }))

        it('checks if the scope.cfg was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            expect(scope.cfg).toBeDefined();
        }))
    })

    describe('GET /api/students/payments', function()
    {
        it('should fetch the get correctly', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            httpMock.flush();
        }))

        it('should fetch the get correctly - no response', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            httpMock.flush();
            expect(scope.pagamentos).toBeDefined();
            expect(scope.pagamentos.length).toEqual(0);
        }))

        it('should fetch the get correctly - only resultado response', inject(function($controller)
        {
            httpMock.expectGET('/api/students/payments').respond({resultado: []});
            $controller('PaymentsController', {$scope: scope});
            httpMock.flush();
            expect(scope.pagamentos).toBeDefined();
            expect(scope.pagamentos.length).toEqual(0);
        }))

        it('should fetch the get correctly - only complete response', inject(function($controller)
        {
            httpMock.expectGET('/api/students/payments').respond({resultado: [{name: 'aluno'}]});
            $controller('PaymentsController', {$scope: scope});
            httpMock.flush();
            expect(scope.pagamentos).toBeDefined();
            expect(scope.pagamentos.length).toEqual(1);
            expect(scope.pagamentos[0].name).toEqual('aluno');
        }))
    })

    describe('POST /api/payments', function()
    {
        it('shouldn\'t continue, because payment is undefined', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});

            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    scope.pay(_wrongParams[i])
                }).toThrow(new Error('Não foi possível realizar o pagamento.'));
            }
        }))

        it('should registerPayment successfully', inject(function($controller)
        {
            httpMock.expectPOST('/api/students/payments').respond(200);
            $controller('PaymentsController', {$scope: scope});
            var pagamento = {name: 'eric', class: '', paymentMonth: ''};
            scope.pay(pagamento);
            httpMock.flush();
            expect(scope.pagamentoEscolhido).toEqual({});
        }))

        it('should register payments successfully - nested objects because of the use of selects', inject(function($controller)
        {
            httpMock.expectPOST('/api/students/payments').respond(200);
            $controller('PaymentsController', {$scope: scope});

            var _pagamento = {name: {name: 'eric'}, class: {class: 'turma1'}, paymentMonth: {name: 'January'}};

            scope.pay(_pagamento);
            httpMock.flush();
        }))
    })

    describe('checks if historic visibility is working as expected', function()
    {
        it('checks historic visibility - should be false', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});

            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    scope.isHistoricoVisible(_wrongParams[i])
                }).toThrow(new Error('Não é possível exibir o histórico. Parâmetro passado incorretamente. Esperava um objeto.'));
            }
        }))

        it('checks historic visibility - should be false', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            var pagamento = {payments: []}
            expect(scope.isHistoricoVisible(pagamento)).toBeFalsy();
        }))

        it('checks historic visibility - should be true', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: scope});
            var pagamento = {payments: [{a: 1}, {b: 2}]}
            expect(scope.isHistoricoVisible(pagamento)).toBeTruthy();
        }))
    })
})