"use strict";

var expect = require('chai').expect;
var BookModel = require('../../../models/Book');
var mongoose = require('mongoose');
var dburl = require('../helpers/db.json');
var DBCreator = require('../helpers/DBCreator');

describe('BookModel', function()
{
    var wrongParams = [null, undefined, true, false, [], {}, 1, function(){}];
    var _book;

    before(function()
    {
        mongoose.connect(dburl.db.test.url);
        mongoose.connection.on('error', function(){});
    })

    beforeEach(function(done)
    {
        new DBCreator().create('book', done);
        _book = new BookModel();
    })

    afterEach(function(done)
    {
        BookModel.remove(done);
    })

    describe('check elements creation', function()
    {
        it('checks if BookModel was created', function()
        {
            expect(BookModel).to.be.a("function");
        })
    })

    describe('findAllBooksByUser', function()
    {
        it('should return error - no user informed', function(done)
        {
            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.findAllBooksByUser(wrongParams[i], function(err, books)
                                                         {
                                                             expect(err).to.not.equal(null);
                                                             expect(err).to.be.an.instanceof(Error);
                                                             expect(books).to.not.exist;
                                                             expect(books).to.equal(null);
                                                         })
            }

            done();
        })

        it('should not return anything - incorrect user', function(done)
        {
            var user = "ABC123";

            _book.findAllBooksByUser(user, function(err, books)
                                           {
                                               expect(err).to.equal(null);
                                               expect(books).to.have.length(0);
                                               done();
                                           })
        })

        it('should return books correctly - correct user', function(done)
        {
            var user = "abc123";

            _book.findAllBooksByUser(user, function(err, books)
                                           {
                                                expect(err).to.equal(null);
                                                expect(typeof books).to.equal('object');
                                                expect(books).to.have.length(1);
                                                done();
                                           })
        })

        it('should return books correctly - correct user', function(done)
        {
            var user = "XYZ987";

            _book.findAllBooksByUser(user, function(err, books)
                                           {
                                               expect(err).to.equal(null);
                                               expect(typeof books).to.equal("object");
                                               expect(books).to.have.length(1);
                                               done();
                                           })
        })
    })

    describe('registerNewBook', function()
    {
        it('shouldn\'t allow to register new book - empty user', function(done)
        {
            var livro = {name: "Livro1", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.registerNewBook(wrongParams[i], livro, function(err)
                                                             {
                                                                  expect(err).to.not.equal(null);
                                                                  expect(err).to.be.an.instanceof(Error);
                                                             })
            }

            done();
        })

        it('shouldn\'t allow to register new book - empty book', function(done)
        {
            var user = "algoAleatorioAqui";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.registerNewBook(user, wrongParams[i], function(err)
                                                            {
                                                                expect(err).to.not.equal(null);
                                                                expect(err).to.be.an.instanceof(Error);
                                                            })
            }

            done();
        })

        it('shouldn\'t allow to register new book - both user and book are empty', function(done)
        {
            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.registerNewBook(wrongParams[i], wrongParams[i], function(err)
                                                                      {
                                                                          expect(err).not.to.equal(null);
                                                                          expect(err).to.be.an.instanceof(Error);
                                                                      })
            }

            done();
        })

        it('should register a book correctly', function(done)
        {
            var _user = "algoAleatorioAqui";
            var livroASerCadastrado = {name: "Livro1", quantity: "2"};

            _book.registerNewBook(_user, livroASerCadastrado, function(err)
                                                              {
                                                                  expect(err).to.equal(null);
                                                                  done();
                                                              })
        })
    })

    describe('editBook', function()
    {
        it('shouldn\'t allow to edit book - empty user', function(done)
        {
            var _id = "someIDHere";
            var _livro = {name: "Livro2", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(wrongParams[i], _livro, _id, function(err)
                                                          {
                                                              expect(err).to.not.equal(null);
                                                              expect(err).to.be.an.instanceof(Error);
                                                          })
            }

            done();
        })

        it('shouldn\'t allow to edit book - empty book', function(done)
        {
            var _id = "algoAleatorioAqui";
            var _user = "algoAleatorioAquiTambem";


            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(_user, wrongParams[i], _id, function(err)
                                                           {
                                                               expect(err).to.not.equal(null);
                                                               expect(err).to.be.an.instanceof(Error);
                                                           })
            }

            done();
        })

        it('shouldn\'t allow to edit book - empty id', function(done)
        {
            var _user = "algoAleatorioAquiTambem";
            var _livro = {name: "Livro1", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(_user, _livro, wrongParams[i], function(err)
                                                              {
                                                                  expect(err).to.not.equal(null);
                                                                  expect(err).to.be.an.instanceof(Error);
                                                              })
            }

            done();
        })


        it('shouldn\'t allow to edit book - all empty', function(done)
        {
            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.editBook(wrongParams[i], wrongParams[i], wrongParams[i], function(err)
                                                                               {
                                                                                   expect(err).to.not.equal(null);
                                                                                   expect(err).to.be.an.instanceof(Error);
                                                                               })
            }

            done();
        })

        it('should edit a book correctly', function(done)
        {
            var _livro = {_id: "534dafae51aaf04b9b8c5b6f", name: "Livro1", quantity: 99};
            var _user = "algoAleatorioAqui";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _book.editBook(_user, _livro, _id, function(err)
                                               {
                                                    expect(err).to.equal(null);
                                                    done();
                                               })
        })
    })

    describe('deleteBook', function()
    {
        it('shouldn\'t delete book - empty user', function(done)
        {
            
            var _id = "ID";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.deleteBook(wrongParams[i], _id, function(err)
                                                      {
                                                          expect(err).to.not.equal(null);
                                                          expect(err).to.be.an.instanceof(Error);
                                                      })
            }

            done();
        })

        it('shouldn\'t delete book - empty id', function(done)
        {
            
            var _user = "algumaIdAleatorioParaOUsuario";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.deleteBook(_user, wrongParams[i], function(err)
                                                        {
                                                            expect(err).to.not.equal(null);
                                                            expect(err).to.be.an.instanceof(Error);
                                                        })
            }

            done();
        })

        it('shouldn\'t delete book - both user and id are empty', function(done)
        {
            

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book.deleteBook(wrongParams[i], wrongParams[i], function(err)
                                                                 {
                                                                    expect(err).to.not.equal(null);
                                                                    expect(err).to.be.an.instanceof(Error);
                                                                 })
            }

            done();
        })

        it('should delete a book correctly', function(done)
        {
            
            var _user = "usuario";
            var _id = '534dafae51aaf04b9b8c5b6f';

            _book.deleteBook(_user, _id, function(err)
                                         {
                                             expect(err).to.be.equal(null);
                                             expect(err).to.not.be.an.instanceof(Error);
                                             done();
                                         })
        })
    })
})