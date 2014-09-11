"use strict";

"use strict";

describe('historico-pagamento-directive', function()
{
    var _scope, _element, _compile, _httpMock;
    beforeEach(module('myClass'));
    var WEBSERVICE = '/api/protected/students/payments';

    beforeEach(inject(function($injector)
    {
        _scope = $injector.get('$rootScope').$new();
        _compile = $injector.get('$compile');
        _httpMock = $injector.get('$httpBackend');
        _scope.teste = [{amountPaid: 1, paymentMonth: 'Janeiro'}];

        var _html = '<historico-pagamento pagamentos="teste" aluno="eric"></historico-pagamento>';

        _element = angular.element(_html);
        _compile(_element)(_scope);

        _scope.$digest();
    }))

    describe('creation', function()
    {
        it('should have element created', function()
        {
            expect(_element).toBeDefined();
        })

        it('should have the controller created', function()
        {
            expect(_element.controller('historicoPagamento')).toBeDefined();
        })

        it('should have aluno name set correctly', function()
        {
            expect(_element.isolateScope().aluno).toEqual('eric');
        })
    })

    describe('deletePayment', function()
    {
        it('should throw an Error, object is not valid', function()
        {
            var _invalidPayments = helper.invalidObjects();

            for (var i = 0; i < _invalidPayments.length; i++)
            {
                expect(function()
                {
                    _element
                        .isolateScope()
                        .deletePayment(_invalidPayments[i]);
                }).toThrow(new Error('Não é possível delegar o Pagamento escolhido. Objeto inválido.'));
            }
        })

        it('should make the delete request correctly - server returns error - 500', function()
        {
            _httpMock.expectDELETE(WEBSERVICE + '/eric/Janeiro/1').respond(500);

            var _payment = {amountPaid: 1, paymentMonth: 'Janeiro'};

            _element
                .isolateScope()
                .deletePayment(_payment);

            _httpMock.flush();
        })

        it('should make the delete request correctly - 200', function()
        {
            _httpMock.expectDELETE(WEBSERVICE + '/eric/Janeiro/1').respond(200);

            expect(_element.isolateScope().pagamentos.length).toEqual(1);

            _element
                .find('.removedor')
                .eq(0)
                .click();

            _httpMock.flush();

            expect(_element.isolateScope().pagamentos.length).toEqual(0);
        })
    })
})