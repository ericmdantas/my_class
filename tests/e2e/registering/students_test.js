"use strict";

var helper = require('../helper');

describe('student', function()
{
    beforeEach(function()
    {
        helper.goTo('alunos');
    })

    describe('register student', function()
    {
        it('should register a student correctly', function()
        {
            $('#adicionar-aluno')
                .click()
                .then(function()
                {
                    element(by.model('aluno.name')).sendKeys('1 STUDENT_BY_PROTRACTOR! :D');
                    element(by.model('aluno.email')).sendKeys('ericdantas0@gmail.com');
                    element(by.model('aluno.birthDate')).sendKeys('26/06/1989');
                    element(by.model('aluno.phone')).sendKeys('27414141');
                    element(by.model('aluno.mobilePhone')).sendKeys('998966240');
                    element(by.model('aluno.address')).sendKeys('Rua rua rua estrada 123');
                    element(by.model('aluno.availability')).sendKeys('10h, 22h e 9h');
                    element(by.model('aluno.class')).sendKeys('Turma5');
                    element(by.model('aluno.status')).sendKeys('interessado');
                    element(by.model('aluno.contract')).sendKeys('mensal');
                    element(by.model('aluno.contractDate')).sendKeys('30/06/1990');

                    $('#register-student-button').click();
                });
        })

        it('should edit a student correctly', function()
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
                    //TODO: FIX STUDENT_CONTROLLER TO FILL THE SELECTS CORRECTLY, AND THEN UNCOMMENT STATUS AND CONTRACT

                    //var _array = ['name', 'birthDate', 'email', /*'status',*/ 'phone', 'mobilePhone', 'address', 'availability', /*'contract',*/ 'contractDate'/*, 'class'*/];
                    var _array = ['name', 'birthDate', 'email', 'phone', 'mobilePhone', 'address', 'availability', 'contractDate'];
                    helper.clearInputs('aluno', _array);

                    element(by.model('aluno.name')).sendKeys('1 *EDITED* STUDENT_BY_PROTRACTOR! :D');
                    element(by.model('aluno.email')).sendKeys('ericdantas0@hotmail.com');
                    element(by.model('aluno.birthDate')).sendKeys('26/06/1988');
                    element(by.model('aluno.phone')).sendKeys('27414142');
                    element(by.model('aluno.mobilePhone')).sendKeys('9989662425');
                    element(by.model('aluno.address')).sendKeys('Rua rua rua estrada 1235');
                    element(by.model('aluno.availability')).sendKeys('10h');
                    element(by.model('aluno.class')).sendKeys('Turma6');
                    element(by.model('aluno.status')).sendKeys('desistente');
                    element(by.model('aluno.contract')).sendKeys('quinzenal');
                    element(by.model('aluno.contractDate')).sendKeys('30/06/1999');

                    $('#edit-student-button').click();
                });
        })

        it('should delete the student recently added', function()
        {
            helper.doTheDeleteOfFirstItem();
        })
    })
})