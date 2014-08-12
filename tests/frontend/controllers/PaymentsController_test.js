"use strict";

describe('PAYMENTSCONTROLLER BEING TESTED', function()
{
    var _scope, _httpMock;

    beforeEach(module('myClass'))

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _httpMock = $injector.get('$httpBackend');
        _httpMock.when('GET', '/api/protected/students/payments').respond([{name: 'Aluno1', payments: []}]);
        _httpMock.when('POST', '/api/protected/students/payments').respond([]);
    }))

    describe('checks elements creation', function()
    {
        it('checks if the controller was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            expect('PaymentsController').toBeDefined();
        }))

        it('checks if the pagamentos object was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            expect(_scope.pagamentos).toBeDefined();
        }))

        it('checks if the pagamentoEscolhido object was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            expect(_scope.pagamentoEscolhido).toBeDefined();
        }))

        it('checks if the pagamentoEscolhido object was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            expect(_scope.pagamentoEscolhido).toBeDefined();
        }))

        it('checks if the _scope.cfg was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            expect(_scope.cfg).toBeDefined();
        }))

        it('checks if months was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            expect(_scope.months).toBeDefined();
            expect(_scope.months.length).toEqual(12);
        }))

        it('checks if inputMaxLength was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});

            expect(_scope.inputMaxLength).toBeDefined();
            expect(typeof _scope.inputMaxLength).toEqual('object');
        }))

        it('checks if isLoadingVisible was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});

            expect(_scope.isLoadingVisible).toBeDefined();
            expect(typeof _scope.isLoadingVisible).toEqual('object');
            expect(_scope.isLoadingVisible.modal).toBeFalsy();
        }))

        it('checks if openModalToRegister was created', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});

            expect(_scope.openModalToRegisterPayment).toBeDefined();
            expect(typeof _scope.openModalToRegisterPayment).toEqual('function');
        }))
    })

    describe('openModalToRegister', function()
    {
        it('should call openModalToRegister without a problem', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            _scope.openModalToRegisterPayment();
        }))
    })

    describe('GET /api/protected/students/payments', function()
    {
        it('should fetch the get correctly', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            _httpMock.flush();
        }))

        it('should fetch the get correctly - no response', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.pagamentos).toBeDefined();
            expect(_scope.pagamentos.length).toEqual(1);
        }))

        it('should fetch the get correctly - only resultado response', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/payments').respond([]);
            $controller('PaymentsController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.pagamentos).toBeDefined();
            expect(_scope.pagamentos.length).toEqual(0);
        }))

        it('should fetch the get correctly - only complete response', inject(function($controller)
        {
            _httpMock.expectGET('/api/protected/students/payments').respond([{name: 'aluno'}]);
            $controller('PaymentsController', {$scope: _scope});
            _httpMock.flush();
            expect(_scope.pagamentos).toBeDefined();
            expect(_scope.pagamentos.length).toEqual(1);
            expect(_scope.pagamentos[0].name).toEqual('aluno');
        }))
    })

    describe('POST /api/protected/payments', function()
    {
        it('shouldn\'t continue, because payment is undefined', inject(function($controller)
        {
            $controller('PaymentsController', {$scope: _scope});

            var _wrongParams = [null, undefined, function(){}, true, false, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    _scope.pay(_wrongParams[i])
                }).toThrow(new Error('Não foi possível realizar o pagamento.'));
            }
        }))

        it('should registerPayment successfully', inject(function($controller)
        {
            _httpMock.expectPOST('/api/protected/students/payments').respond(200);
            $controller('PaymentsController', {$scope: _scope});

            var pagamento = {name: 'eric', class: '', paymentMonth: ''};

            _scope.pay(pagamento);
            _httpMock.flush();

            expect(_scope.pagamentoEscolhido).toEqual({});
        }))

        it('should register payments successfully - nested objects because of the use of selects', inject(function($controller)
        {
            _httpMock.expectPOST('/api/protected/students/payments').respond(200);
            $controller('PaymentsController', {$scope: _scope});

            var _pagamento = {name: {name: 'Aluno1'}, class: {class: 'turma1'}, paymentMonth: {name: 'January'}};

            _scope.pay(_pagamento);
            _httpMock.flush();
        }))
    })
})