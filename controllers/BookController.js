"use strict";

var BookModel = require('../models/Book');
var ErrorHandler = require('../lib/ErrorHandler');

function Book()
{
    function _getBooksInfo(req, res)
    {
        var _usuario = req.session.passport.user;
        var _book = new BookModel();

        function callback(error, books)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta de livros'));
            }

            else
            {
                books ? res.json({books: books})
                      : res.json({books: []})
            }
        }

        _book.findAllBooksByUser(_usuario, callback)
    }

    function _registerBook(req, res)
    {
        var _usuario = req.session.passport.user;
        var _livro = req.body;
        var _book = new BookModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'cadastro de livros'));
            }
            else
                res.end();
        }

        _book.registerNewBook(_usuario, _livro, callback);
    }

    function _editBook(req, res)
    {
        var _usuario = req.session.passport.user;
        var _livroID = req.params.id;
        var _livro = req.body;
        var _book = new BookModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'edição de livros'));
            }
            else
                res.end();
        }

        _book.editBook(_usuario, _livro, _livroID, callback);
    }

    function _deleteBook(req, res)
    {
        var _usuario = req.session.passport.user;
        var _identificacaoLivro = req.params.id;
        var _book = new BookModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'deleção de livros'));
            }
            else
                res.end();
        }

        _book.deleteBook(_usuario, _identificacaoLivro, callback);
    }

    return {
                getBooksInfo: _getBooksInfo,
                registerBook: _registerBook,
                editBook: _editBook,
                deleteBook: _deleteBook
           }
}

module.exports = new Book();