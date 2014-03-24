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
            .exec(function(err, doc)
            {
                if (err || !done)
                    throw err;

                done(doc);
            })
    }

    bookSchema.methods.registerNewBook = function(usuario, livro, done)
    {
        livro.usersAllowed = [usuario];
        var book = new Book(livro);

        book.save(function(err, saved)
        {
            if (err)
               throw err;

            done();
        })
    }

    bookSchema.methods.editBook = function(usuario, livro, done)
    {
        var query = {username: usuario, "books._id": livro._id};
        var updt = {"books.$": livro};

        Book.update(query, updt)
            .exec(function(err, updated)
            {
                if (err)
                    throw err;

                done();
            })
    }

    bookSchema.methods.deleteBook = function(user, identificacaoLivro, done)
    {
        var query = {username: user, "books._id" : identificacaoLivro};
        var projection = {students: 0, classes: 0, teachers: 0};

        Book.findOne(query, projection)
            .exec(function(err, foundDoc)
            {
                if (err)
                    throw err;

                for (var i = 0; i < foundDoc.books.length; i++)
                {
                    if (id === foundDoc.books[i]._id.toString())
                    {
                        foundDoc.books.splice(i, 1);

                        foundDoc.save(function(err, saved)
                        {
                            if (err)
                                throw err;

                            done();
                        })
                    }
                }
            })
    }

    var Book = mongoose.model('Book', bookSchema);

    module.exports = Book;

}(require('mongoose')))