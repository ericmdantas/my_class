"use strict";

var helper = require('../helper');

describe('book', function()
{
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

                    $('#register-book-button').click();
                });
        })

        it('should edit a book correctly', function()
        {
            element
                .all(by.css('.plus-less-info'))
                .get(0)
                .click()
                .then(function()
                {
                    helper.clickToEditFirstElement();
                })
                .then(function()
                {
                    helper.clearInputs('livro', ['name', 'quantity']);

                    element(by.model('livro.name')).sendKeys('123 *EDITED* BOOK_BY_PROTRACTOR! =]');
                    element(by.model('livro.quantity')).sendKeys('888');

                    $('#edit-book-button').click();
                });
        })

        it('should delete the book recently added', function()
        {
            helper.doTheDeleteOfFirstItem();
        })
    })
})