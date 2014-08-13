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
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .findAllBooksByUser(wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should not return anything - incorrect user', function(done)
        {
            var user = "ABC123";

            var _onSuccess = function(books)
            {
                expect(books).to.have.length(0);
                done();
            }

            _book
                .findAllBooksByUser(user)
                .then(_onSuccess);
        })

        it('should return books correctly - correct user', function(done)
        {
            var _onSuccess = function(books)
            {
                expect(typeof books).to.equal('object');
                expect(books).to.have.length(1);
                done();
            }

            var user = "abc123";

            _book
                .findAllBooksByUser(user)
                .then(_onSuccess);
        })

        it('should return books correctly - correct user', function(done)
        {
            var _onSuccess = function(books)
            {
                expect(typeof books).to.equal("object");
                expect(books).to.have.length(1);
                done();
            }

            var user = "XYZ987";

            _book
                .findAllBooksByUser(user)
                .then(_onSuccess);
        })
    })

    describe('registerNewBook', function()
    {
        it('shouldn\'t allow to register new book - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            var livro = {name: "Livro1", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .registerNewBook(wrongParams[i], livro)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t allow to register new book - empty book', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            var user = "algoAleatorioAqui";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .registerNewBook(user, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t allow to register new book - both user and book are empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).not.to.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .registerNewBook(wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should register a book correctly', function(done)
        {
            var _onSuccess = function(err)
            {
                expect(err).to.not.be.defined;
                done();
            };

            var _user = "algoAleatorioAqui";
            var livroASerCadastrado = {name: "Livro1", quantity: "2"};

            _book
                .registerNewBook(_user, livroASerCadastrado)
                .then(_onSuccess);
        })
    })

    describe('editBook', function()
    {
        it('shouldn\'t allow to edit book - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _id = "someIDHere";
            var _livro = {name: "Livro2", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .editBook(wrongParams[i], _livro, _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t allow to edit book - empty book', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            };

            var _id = "algoAleatorioAqui";
            var _user = "algoAleatorioAquiTambem";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .editBook(_user, wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t allow to edit book - empty id', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            var _user = "algoAleatorioAquiTambem";
            var _livro = {name: "Livro1", quantity: 1};

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .editBook(_user, _livro, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })


        it('shouldn\'t allow to edit book - all empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .editBook(wrongParams[i], wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should edit a book correctly', function(done)
        {
            var _onSuccess = function(err)
            {
                expect(err).to.not.be.defined;
                done();
            }

            var _livro = {_id: "534dafae51aaf04b9b8c5b6f", name: "Livro1", quantity: 99};
            var _user = "algoAleatorioAqui";
            var _id = "534dafae51aaf04b9b8c5b6f";

            _book
                .editBook(_user, _livro, _id)
                .then(_onSuccess);
        })
    })

    describe('deleteBook', function()
    {
        it('shouldn\'t delete book - empty user', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            var _id = "ID";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .deleteBook(wrongParams[i], _id)
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t delete book - empty id', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }
            
            var _user = "algumaIdAleatorioParaOUsuario";

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .deleteBook(_user, wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('shouldn\'t delete book - both user and id are empty', function(done)
        {
            var _onError = function(err)
            {
                expect(err).to.not.equal(null);
                expect(err).to.be.an.instanceof(Error);
            }

            for (var i = 0; i < wrongParams.length; i++)
            {
                _book
                    .deleteBook(wrongParams[i], wrongParams[i])
                    .then(undefined, _onError);
            }

            done();
        })

        it('should delete a book correctly', function(done)
        {
            var _onSuccess = function()
            {
                done();
            }

            var _user = "usuario";
            var _id = '534dafae51aaf04b9b8c5b6f';

            _book
                .deleteBook(_user, _id)
                .then(_onSuccess);
        })
    })
})