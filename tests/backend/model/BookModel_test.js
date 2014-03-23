"use strict";

var assert = require('assert'),
    BookModel = require('../../../models/books');

describe('Testing BookModel', function()
{
    describe('check elements creation', function()
    {
        it('checks if BookModel was created', function()
        {
            assert.strictEqual(typeof BookModel, "object");
        })

        it('checks if BookModel.bookSchema was created', function()
        {
            assert.strictEqual(typeof BookModel.bookSchema, "object");
        })

        it('checks if BookModel.findAllBooksByUser was created', function()
        {
            assert.strictEqual(typeof BookModel.findAllBooksByUser, "function");
        })

        it('checks if BookModel.registerNewBook was created', function()
        {
            assert.strictEqual(typeof BookModel.registerNewBook, "function");
        })

        it('checks if BookModel.editBook was created', function()
        {
            assert.strictEqual(typeof BookModel.editBook, "function");
        })

        it('checks if BookModel.deleteBook was created', function()
        {
            assert.strictEqual(typeof BookModel.deleteBook, "function");
        })
    })
})