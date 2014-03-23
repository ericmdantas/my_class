"use strict";

var BookModel = require('../models/books');

function Book()
{
    function pegaInformacoesLivros(req, res)
    {
        var usuario = req.query.u;

        BookModel.findAllBooksByUser(usuario, function(doc)
        {
            doc ? res.json({books: doc.books})
                : res.json({books: []})
        });
    }

    function cadastraLivro(req, res)
    {
        var usuario = req.query.u;
        var livro = req.body;

        BookModel.registerNewBook(usuario, livro, function(){res.end()});
    }

    function editaLivro(req, res)
    {
        var usuario = req.query.u;
        var livro = req.body;

        function callback()
        {
            res.end();
        }

        BookModel.editBook(usuario, livro, callback);
    }

    function removeLivro(req, res)
    {
        var usuario = req.query.u;
        var identificacaoLivro = req.query.b;
        BookModel.deleteBook(usuario, identificacaoLivro, function(){res.end()});
    }


    return {
                getBooksInfo: pegaInformacoesLivros,
                registerBook: cadastraLivro,
                editBook: editaLivro,
                deleteBook: removeLivro
           }
}

module.exports = new Book();