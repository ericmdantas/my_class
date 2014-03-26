"use strict";

var assert = require('assert'),
    BookModel = require('../../../models/Book');

describe('Testing BookModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if BookModel was created', function()
        {
            assert.strictEqual(typeof BookModel, "function");
        })

        it('checks if BookModel.findAllBooksByUser was created', function()
        {
            var book = new BookModel();
            assert.strictEqual(typeof book.findAllBooksByUser, "function");
        })

        it('checks if BookModel.registerNewBook was created', function()
        {
            var book = new BookModel();
            assert.strictEqual(typeof book.registerNewBook, "function");
        })

        it('checks if BookModel.editBook was created', function()
        {
            var book = new BookModel();
            assert.strictEqual(typeof book.editBook, "function");
        })

        it('checks if BookModel.deleteBook was created', function()
        {
            var book = new BookModel();
            assert.strictEqual(typeof book.deleteBook, "function");
        })
    })
})