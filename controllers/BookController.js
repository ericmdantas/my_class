"use strict";

var BookModel = require('../models/Book');
var ErrorHandler = require('../lib/ErrorHandler');

function Book()
{
    function pegaInformacoesLivros(req, res)
    {
        var usuario = req.session.passport.user;
        var book = new BookModel();

        function callback(error, books)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta de livros'));
            }

            else
            {
                books ? res.json({books: books})
                      : res.json({books: []})
            }
        }

        book.findAllBooksByUser(usuario, callback)
    }

    function cadastraLivro(req, res)
    {
        var usuario = req.session.passport.user;
        var livro = req.body;
        var book = new BookModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'cadastro de livros'));
            }
            else
                res.end();

        }

        book.registerNewBook(usuario, livro, callback);
    }

    function editaLivro(req, res)
    {
        var usuario = req.session.passport.user;
        var livro = req.body;
        var book = new BookModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'edição de livros'));
            }
            else
                res.end();
        }

        book.editBook(usuario, livro, callback);
    }

    function removeLivro(req, res)
    {
        var usuario = req.session.passport.user;
        var identificacaoLivro = req.params.id;
        var book = new BookModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'deleção de livros'));
            }
            else
                res.end();
        }

        book.deleteBook(usuario, identificacaoLivro, callback);
    }


    return {
                getBooksInfo: pegaInformacoesLivros,
                registerBook: cadastraLivro,
                editBook: editaLivro,
                deleteBook: removeLivro
           }
}

module.exports = new Book();