"use strict";

var assert = require('assert');
var BookModel = require('../../../models/Book');
var mongoose = require('mongoose');
var dburl = require('../config/db.json');

describe('BookModel', function()
{
    var wrongParams = [null, undefined, true, false, [], {}, 1, function(){}];

    before(function()
    {
        mongoose.connect(dburl);
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

        it('should return error - no user informed', function(done)
        {
            var _book = new BookModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.findAllBooksByUser(wrongParams[i], function(err, books)
                                                         {
                                                             assert.notStrictEqual(err, null);
                                                             assert.strictEqual(err instanceof Error, true);
                                                             assert.strictEqual(books, null);
                                                         })
            }

            done();
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

    describe('registerNewBook', function()
    {
        afterEach(function(done)
        {
            BookModel.remove(done);
        })

        it('shouldn\'t allow to register new book - empty user', function(done)
        {
            var _book = new BookModel();
            var livro = {name: "Livro1", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.registerNewBook(wrongParams[i], livro, function(err)
                                                             {
                                                                  assert.notEqual(err, null);
                                                                  assert.strictEqual(err instanceof Error, true);
                                                             })
            }

            done();
        })

        it('shouldn\'t allow to register new book - empty book', function(done)
        {
            var _book = new BookModel();
            var user = "algoAleatorioAqui";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.registerNewBook(user, wrongParams[i], function(err)
                                                            {
                                                                assert.notEqual(err, null);
                                                                assert.strictEqual(err instanceof Error, true);
                                                            })
            }

            done();
        })

        it('shouldn\'t allow to register new book - both user and book are empty', function(done)
        {
            var _book = new BookModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.registerNewBook(wrongParams[i], wrongParams[i], function(err)
                                                                      {
                                                                          assert.notEqual(err, null);
                                                                          assert.strictEqual(err instanceof Error, true);
                                                                      })
            }

            done();
        })

        it('should register a book correctly', function(done)
        {
            var _book = new BookModel();
            var _user = "algoAleatorioAqui";
            var livroASerCadastrado = {name: "Livro1", quantity: "2"};

            _book.registerNewBook(_user, livroASerCadastrado, function(err)
                                                              {
                                                                  assert.strictEqual(err, null);
                                                                  done();
                                                              })
        })
    })

    describe('editBook', function()
    {
        it('shouldn\'t allow to edit book - empty user', function(done)
        {
            var _book = new BookModel();
            var _id = "someIDHere";
            var _livro = {name: "Livro2", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(wrongParams[i], _livro, _id, function(err)
                                                          {
                                                              assert.notStrictEqual(err, null);
                                                              assert.strictEqual(err instanceof Error, true);
                                                          })
            }

            done();
        })

        it('shouldn\'t allow to edit book - empty book', function(done)
        {
            var _book = new BookModel();
            var _id = "algoAleatorioAqui";
            var _user = "algoAleatorioAquiTambem";


            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(_user, wrongParams[i], _id, function(err)
                                                           {
                                                               assert.notStrictEqual(err, null);
                                                               assert.strictEqual(err instanceof Error, true);
                                                           })
            }

            done();
        })

        it('shouldn\'t allow to edit book - empty id', function(done)
        {
            var _book = new BookModel();
            var _user = "algoAleatorioAquiTambem";
            var _livro = {name: "Livro1", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(_user, _livro, wrongParams[i], function(err)
                                                              {
                                                                  assert.notStrictEqual(err, null);
                                                                  assert.strictEqual(err instanceof Error, true);
                                                              })
            }

            done();
        })


        it('shouldn\'t allow to edit book - all empty', function(done)
        {
            var _book = new BookModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(wrongParams[i], wrongParams[i], wrongParams[i], function(err)
                                                                               {
                                                                                   assert.notStrictEqual(err, null);
                                                                                   assert.strictEqual(err instanceof Error, true);
                                                                               })
            }

            done();
        })

        it('should edit a book correctly', function(done)
        {
            var _book = new BookModel();

            var _livro = {_id: "534dafae51aaf04b9b8c5b6f", name: "Livro1", quantity: 99};
            var _user = "algoAleatorioAqui";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _book.editBook(_user, _livro, _id, function(err)
                                               {
                                                    assert.strictEqual(err, null);
                                                    done();
                                               })
        })
    })

    describe('deleteBook', function()
    {
        beforeEach(function(done)
        {
            BookModel.create({_id: "534dafae51aaf04b9b8c5b6f", name: "Livro1", quantity: 99, usersAllowed: ["usuario"]}, done);
        })

        afterEach(function(done)
        {
            BookModel.remove(done);
        })

        it('shouldn\'t delete book - empty user', function(done)
        {
            var _book = new BookModel();
            var _id = "ID";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.deleteBook(wrongParams[i], _id, function(err)
                                                      {
                                                          assert.notStrictEqual(err, null);
                                                          assert.strictEqual(err instanceof Error, true);
                                                      })
            }

            done();
        })

        it('shouldn\'t delete book - empty id', function(done)
        {
            var _book = new BookModel();
            var _user = "algumaIdAleatorioParaOUsuario";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.deleteBook(_user, wrongParams[i], function(err)
                                                        {
                                                            assert.notStrictEqual(err, null);
                                                            assert.strictEqual(err instanceof Error, true);
                                                        })
            }

            done();
        })

        it('shouldn\'t delete book - both user and id are empty', function(done)
        {
            var _book = new BookModel();

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.deleteBook(wrongParams[i], wrongParams[i], function(err)
                                                                 {
                                                                    assert.notStrictEqual(err, null);
                                                                    assert.strictEqual(err instanceof Error, true);
                                                                 })
            }

            done();
        })

        it('should delete a book correctly', function(done)
        {
            var _book = new BookModel();
            var _user = "usuario";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _book.deleteBook(_user, _id, function(err)
                                         {
                                             assert.strictEqual(err, null);
                                             assert.notStrictEqual(err instanceof Error, true);
                                             done();
                                         })



        })
    })
})