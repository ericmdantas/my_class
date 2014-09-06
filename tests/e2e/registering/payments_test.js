"use strict";

var helper = require('../helper');

describe('payment', function()
{
    beforeEach(function()
    {
        helper.goTo('pagamentos');
    })

    describe('payment', function()
    {
        it('should register a payment correctly', function()
        {
            $('#adicionar-pagamento')
                .click()
                .then(function()
                {
                    element(by.model('alunoPagamento.name')).sendKeys('Aluno0');
                    element(by.model('alunoPagamento.paidWithWhat')).sendKeys('moni');
                    element(by.model('alunoPagamento.paymentMonth')).sendKeys('Janeiro');
                    element(by.model('alunoPagamento.amountPaid')).sendKeys('1,99');
                    element(by.model('alunoPagamento.observation')).sendKeys('pagamento à vista, bruh');

                    $('#register-payment-button').click();
                });
        })
    })
})