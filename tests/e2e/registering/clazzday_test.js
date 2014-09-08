"use strict";

var helper = require('../helper');

describe('clazzday', function()
{
    beforeEach(function()
    {
        helper.goTo('aulas');
    })

    describe('payment', function()
    {
        it('should register a payment correctly', function()
        {
            $('#adicionar-aula')
                .click()
                .then(function()
                {
                    element(by.model('turma.name')).sendKeys('Turma3');
                    element(by.model('turma.teacherName')).sendKeys('Professor0');
                    element(by.model('turma.subject')).sendKeys('Matéria by Protractor');
                    element(by.model('turma.observation')).sendKeys('Ensinado da página: 1 até 100');

                    $('#register-clazzday-button').click();
                });
        })
    })
})