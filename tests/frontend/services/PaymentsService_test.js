"use strict";

describe('PaymentsService', function()
{
    var httpMock, PaymentService;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        httpMock = $injector.get('$httpBackend');
        PaymentService = $injector.get('PaymentService');
    }))

    describe('checks elements creation', function()
    {
        it('checks if getPayments was created', function()
        {
            expect(PaymentService.getPayments).toBeDefined();
            expect(typeof PaymentService.getPayments).toEqual('function');
        })

        it('checks if registerPayment was created', function()
        {
            expect(PaymentService.registerPayment).toBeDefined();
            expect(typeof PaymentService.registerPayment).toEqual('function');
        })
    })

    describe('GET /api/students/payment', function()
    {
        it('should fetch request correctly', function()
        {
            httpMock.expectGET('/api/students/payments').respond();
            PaymentService.getPayments();
            httpMock.flush();
        })
    })

    describe('POST /api/students/payment', function()
    {
        it('should throw error - wrong student param', function()
        {
            var _wrongParams = [, null, undefined, true, false, function(){}, {}, [], 1];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function(){PaymentService.registerPayment(_wrongParams[i])})
                                                .toThrow(new Error('Não é possível realizar o pagamento. Parâmetro PAGAMENTO passado de forma errada.'));
            }
        })

        it('should register payment correctly', function()
        {
            httpMock.expectPOST('/api/students/payments').respond();
            var _pagamento = {name: "aluno1"};

            PaymentService.registerPayment(_pagamento);
            httpMock.flush();
        })
    })
})