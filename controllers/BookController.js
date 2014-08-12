"use strict";

var BookModel = require('../models/Book');
var ErrorHandler = require('../lib/ErrorHandler');

function Book()
{
    function _getBooksInfo(req, res)
    {
        var _onSuccess = function(books)
        {
            res.json(books);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _book = new BookModel();

        _book
            .findAllBooksByUser(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _registerBook(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(err)
        {
            res.json(400, err);
        }

        var _onException = function(ex)
        {
            res.json(500, ex);
        }

        var _usuario = req.session.passport.user;
        var _livro = req.body;
        var _book = new BookModel();

        _book
            .registerNewBook(_usuario, _livro)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _editBook(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _livroID = req.params.id;
        var _livro = req.body;
        var _book = new BookModel();

        _book
            .editBook(_usuario, _livro, _livroID)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _deleteBook(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _identificacaoLivro = req.params.id;
        var _book = new BookModel();

        _book
            .deleteBook(_usuario, _identificacaoLivro)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    return {
                getBooksInfo: _getBooksInfo,
                registerBook: _registerBook,
                editBook: _editBook,
                deleteBook: _deleteBook
           }
}

module.exports = new Book();