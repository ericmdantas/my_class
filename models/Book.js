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
        if ((!user) || ("string" !== typeof user))
            return done(new Error("Usuario não informado."), null);

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
        if ((!usuario) || ("string" !== typeof usuario))
            return done(new Error("Usuario não informado no momento do cadastro de livros."), null);

        if ((!livro) || ("object" !== typeof livro) || (!Object.keys(livro).length))
            return done(new Error("Livro não informado no momento de cadastro de livros."), null);

        livro.usersAllowed = [usuario];
        var book = new Book(livro);

        book.save(function(err, saved)
        {
            if (err)
                return done(err);

            return done(null);
        })
    }

    bookSchema.methods.editBook = function(usuario, livro, id, done)
    {
        if ((!usuario) || ("string" !== typeof usuario))
            return done(new Error("Usuario não informado no momento da edição de livros."), null);

        if ((!livro) || ("object" !== typeof livro) || (!Object.keys(livro).length))
            return done(new Error("Livro não informado no momento da edição de livros."), null);

        if ((!id) || ("string" !== typeof id))
            return done(new Error("ID não informado no momento da edição de livros."), null);

        var query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete livro._id;
        var updt = livro;

        Book.findOneAndUpdate(query, updt)
            .exec(function(err, updated)
                 {
                     if (err)
                         return done(err);

                     done(null);
                 })
    }

    bookSchema.methods.deleteBook = function(usuario, id, done)
    {
        if ((!usuario) || ("string" !== typeof usuario))
            return done(new Error("Usuario não informado no momento do cadastro de livros."), null);

        if ((!id) || ("string" !== typeof id))
            return done(new Error("ID não informado no momento da deleção de livros."), null);

        var query = {usersAllowed: {$in: [usuario]}, _id: id};

        Book.findOneAndRemove(query)
            .exec(function(err, deleted)
            {
                if (err)
                    return done(err);

                done(null);
            })
    }

    var Book = mongoose.model('Book', bookSchema);

    module.exports = Book;

}(require('mongoose')))