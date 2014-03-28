"use strict";

//books

(function(mongoose)
{
    var bookSchema = mongoose.Schema
    ({
        name: {type: String, trim: true, required: true, index: true},
        quantity: {type: String, trim: true, required: true},
        registered: {type: Date, default: new Date},
        usersAllowed: []
    });

    bookSchema.methods.findAllBooksByUser = function(user, done)
    {
        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0};

        Book.find(query, projection)
            .exec(function(err, books)
            {
                if (err)
                    return done(err, null);

                done(null, books);
            })
    }

    bookSchema.methods.registerNewBook = function(usuario, livro, done)
    {
        livro.usersAllowed = [usuario];
        var book = new Book(livro);

        book.save(function(err, saved)
        {
            if (err)
                return done(err, null);

            done(null);
        })
    }

    bookSchema.methods.editBook = function(usuario, livro, done)
    {
        var query = {usersAllowed: {$in: [usuario]}, _id: livro._id};
        delete livro._id;
        var updt = livro;

        Book.findOneAndUpdate(query, updt)
            .exec(function(err, updated)
                 {
                     if (err)
                         return done(err, null);

                     done(null);
                 })
    }

    bookSchema.methods.deleteBook = function(user, identificacaoLivro, done)
    {
        var query = {usersAllowed: {$in: [user]}, _id: identificacaoLivro};

        Book.findOneAndRemove(query)
            .exec(function(err, deleted)
            {
                if (err)
                    return done(err, null);

                done(null);
            })
    }

    var Book = mongoose.model('Book', bookSchema);

    module.exports = Book;

}(require('mongoose')))