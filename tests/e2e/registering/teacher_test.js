"use strict";

var helper = require('../helper');

describe('teacher', function()
{
    beforeEach(function()
    {
        helper.goTo('professores');
    })

    describe('register teacher', function()
    {
        it('should register a teacher correctly', function()
        {
            $('#adicionar-professor')
                .click()
                .then(function()
                {
                    element(by.model('professor.name')).sendKeys('1 TEACHER_BY_PROTRACTOR! :D');
                    element(by.model('professor.birthDate')).sendKeys('26/06/1989');
                    element(by.model('professor.admission')).sendKeys('26/06/2000');
                    element(by.model('professor.email')).sendKeys('ericdantas0@gmail.com');
                    element(by.model('professor.phone')).sendKeys('27414141');
                    element(by.model('professor.mobilePhone')).sendKeys('998966240');
                    element(by.model('professor.address')).sendKeys('Rua rua rua estrada 123');
                    element(by.model('professor.availability')).sendKeys('10h, 22h e 9h');
                    element(by.model('professor.salary')).sendKeys('9999.99');

                    $('#register-teacher-button').click();
                });
        })

        it('should edit a teacher correctly', function()
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
                    var _array = ['name', 'birthDate', 'email',  'admission', 'phone', 'mobilePhone', 'address', 'availability', 'salary'];
                    helper.clearInputs('professor', _array);

                    element(by.model('professor.name')).sendKeys('1 *EDITED* TEACHER_BY_PROTRACTOR! :D');
                    element(by.model('professor.birthDate')).sendKeys('27/06/1989');
                    element(by.model('professor.admission')).sendKeys('28/06/2000');
                    element(by.model('professor.email')).sendKeys('ericdantas0@hotmail.com');
                    element(by.model('professor.phone')).sendKeys('27414148');
                    element(by.model('professor.mobilePhone')).sendKeys('898966240');
                    element(by.model('professor.address')).sendKeys('Rua rua rua estrada 123456');
                    element(by.model('professor.availability')).sendKeys('10h, 22h, 9h e 7h');
                    element(by.model('professor.salary')).sendKeys('19999.99');

                    $('#edit-teacher-button').click();
                });
        })

        it('should delete the teacher recently added', function()
        {
            helper.doTheDeleteOfFirstItem();
        })
    })
})