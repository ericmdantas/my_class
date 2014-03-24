"use strict";

var BookModel = require('../models/Book');

function Book()
{
    function pegaInformacoesLivros(req, res)
    {
        var usuario = req.query.u;
        var book = new BookModel();

        book.findAllBooksByUser(usuario, function(books)
        {
            books ? res.json({books: books})
                  : res.json({books: []})
        });
    }

    function cadastraLivro(req, res)
    {
        var usuario = req.query.u;
        var livro = req.body;
        var book = new BookModel();

        book.registerNewBook(usuario, livro, function(){res.end()});
    }

    function editaLivro(req, res)
    {
        var usuario = req.query.u;
        var livro = req.body;
        var book = new BookModel();

        function callback()
        {
            res.end();
        }

        book.editBook(usuario, livro, callback);
    }

    function removeLivro(req, res)
    {
        var usuario = req.query.u;
        var identificacaoLivro = req.query.b;
        var book = new BookModel();

        book.deleteBook(usuario, identificacaoLivro, function(){res.end()});
    }


    return {
                getBooksInfo: pegaInformacoesLivros,
                registerBook: cadastraLivro,
                editBook: editaLivro,
                deleteBook: removeLivro
           }
}

module.exports = new Book();