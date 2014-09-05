"use strict";

var helper = require('../helper');

describe('book', function()
{
    browser.get('#');
    helper.login();

    beforeEach(function()
    {
        helper.goTo('livros');
    })

    describe('register book', function()
    {
        it('should register a book correctly', function()
        {
            $('#adicionarLivro')
                .click()
                .then(function()
                {
                    element(by.model('livro.name')).sendKeys('1 BOOK_BY_PROTRACTOR! :D');
                    element(by.model('livro.quantity')).sendKeys('999');

                    return $('#register-book-button').click();
                });
        })

        it('should delete the book recently added', function()
        {
            element
                .all(by.css('.plus-less-info'))
                .get(0)
                .click()
                .then(function()
                {
                    return element
                            .all(by.css('.plus-less-info .btn-link'))
                            .get(0)
                            .click();
                })
                .then(function()
                {
                    element
                        .all(by.css('.modal-footer .btn.btn-default'))
                        .get(0)
                        .click();
                })
        })
    })
})