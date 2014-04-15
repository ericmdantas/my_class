"use strict";

var assert = require('assert');
var BookModel = require('../../../models/Book');
var mongoose = require('mongoose');

describe('Testing BookModel', function()
{
    before(function()
    {
        mongoose.connect('mongodb://localhost/my_class_test');
        mongoose.connection.on('error', function(){});
    })

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

    describe('findAllBooksByUser', function()
    {
        beforeEach(function(done)
        {
            BookModel.create({name: "Livro1", quantity: "1", usersAllowed: ["abc123"]},
                             {name: "Livro2", quantity: "2", usersAllowed: ["XYZ987"]}, done);
        })

        afterEach(function(done)
        {
            BookModel.remove(done);
        })

        it('should not return anything - incorrect user', function(done)
        {
            var _book = new BookModel();
            var user = "ABC123";

            _book.findAllBooksByUser(user, function(err, books)
            {
                assert.strictEqual(err, null);
                assert.strictEqual(books.length, 0);
                done();
            })
        })

        it('should return books correctly - correct user', function(done)
        {
            var _book = new BookModel();
            var user = "abc123";

            _book.findAllBooksByUser(user, function(err, books)
                                           {
                                                assert.strictEqual(err, null);
                                                assert.strictEqual(typeof books, "object");
                                                assert.strictEqual(books.length, 1);
                                                done();
                                           })
        })

        it('should return books correctly - correct user', function(done)
        {
            var _book = new BookModel();
            var user = "XYZ987";

            _book.findAllBooksByUser(user, function(err, books)
                                           {
                                               assert.strictEqual(err, null);
                                               assert.strictEqual(typeof books, "object");
                                               assert.strictEqual(books.length, 1);
                                               done();
                                           })
        })
    })
})