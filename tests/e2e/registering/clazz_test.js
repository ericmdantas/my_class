"use strict";

var helper = require('../helper');

describe('clazz', function()
{
    beforeEach(function()
    {
        helper.goTo('turmas');
    })

    describe('register clazz', function()
    {
        it('should register a clazz correctly', function()
        {
            $('#adicionar-turma')
                .click()
                .then(function()
                {
                    element(by.model('turma.name')).sendKeys('1 CLAZZ_BY_PROTRACTOR! :D');
                    element(by.model('turma.time')).sendKeys('11h');
                    element(by.model('turma.students'))
                        .sendKeys('Aluno0')
                        .sendKeys(protractor.Key.ENTER);

                    $('#register-clazz-button').click();
                });
        })

        it('should edit a clazz correctly', function()
        {
            element
                .all(by.css('.plus-less-info'))
                .get(0)
                .click()
                .then(function()
                {
                    return helper.clickToEditFirstElement();
                })
                .then(function()
                {
                    //TODO: FIX CLAZZ_CONTROLLER TO FILL THE SELECTS CORRECTLY, AND THEN UNCOMMENT STATUS AND CONTRACT

                    var _array = ['name', 'time'/*, students*/];
                    helper.clearInputs('turma', _array);

                    element(by.model('turma.name')).sendKeys('1 *EDITED* CLAZZ_BY_PROTRACTOR! :D');
                    element(by.model('turma.time')).sendKeys('10h');
                    element(by.model('turma.students'))
                        .sendKeys('Aluno1')
                        .sendKeys(protractor.Key.ENTER);

                    $('#edit-clazz-button').click();
                });
        })

        it('should delete the clazz recently added', function()
        {
            helper.doTheDeleteOfFirstItem();
        })
    })
})