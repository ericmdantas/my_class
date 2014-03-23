"use strict";

//books

(function(mongoose, db)
{
    var bookSchema = mongoose.Schema({
        name: {type: String, trim: true, required: true, index: true},
        quantity: {type: String, trim: true, required: true},
        registered: {type: Date, default: new Date}
    });

    function findAllBooksByUser(user, done)
    {
        var query = {username: user};
        var projection = {books: 1};
        db.findAll(query, projection, done);
    }

    function registerNewBook(usuario, livro, done)
    {
        var query = {username: usuario};
        var updt = {$push: {books: livro}};
        db.registerNew(query, updt, done);
    }

    function editBook(usuario, livro, done)
    {
        var query = {username: usuario, "books._id": livro._id};
        var updt = {"books.$": livro};
        db.editInfo(query, updt, done);
    }

    function deleteBook(user, identificacaoLivro, done)
    {
        var query = {username: user, "books._id" : identificacaoLivro};
        var projection = {students: 0, classes: 0, teachers: 0};
        db.delete(query, projection, identificacaoLivro, 'books', done);
    }

    exports.bookSchema = bookSchema;

    exports.findAllBooksByUser = findAllBooksByUser;
    exports.registerNewBook = registerNewBook;
    exports.editBook = editBook;
    exports.deleteBook = deleteBook;

}(require('mongoose'), require('../lib/libDB')))