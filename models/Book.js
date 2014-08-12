"use strict";

//books

(function(mongoose, lib, Q, bookSchema)
{
    bookSchema.methods.findAllBooksByUser = function(user)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(user))
        {
            deferred.reject(new Error("Usuario não informado."));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [user]}};
        var projection = {usersAllowed: 0};

        Book.find(query, projection)
            .exec(function(err, books)
            {
                err ? deferred.reject(err)
                    : deferred.resolve(books);
            })

        return deferred.promise;
    }

    bookSchema.methods.registerNewBook = function(usuario, livro)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Usuario não informado no momento do cadastro de livros."));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(livro))
        {
            deferred.reject(new Error("Livro não informado no momento de cadastro de livros."))
            return deferred.promise;
        }

        livro.usersAllowed = [usuario];
        var book = new Book(livro);

        book.save(function(err, saved)
        {
            err ? deferred.reject(err)
                : deferred.resolve();
        })

        return deferred.promise;
    }

    bookSchema.methods.editBook = function(usuario, livro, id)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Usuario não informado no momento da edição de livros."));
            return deferred.promise;
        }

        if (lib.isObjectInvalid(livro))
        {
            deferred.reject(new Error("Livro não informado no momento da edição de livros."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("ID não informado no momento da edição de livros."));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}, _id: id};
        delete livro._id;
        var updt = livro;

        Book.findOneAndUpdate(query, updt)
            .exec(function(err, updated)
                 {
                     err ? deferred.reject(err)
                         : deferred.resolve();
                 })

        return deferred.promise;
    }

    bookSchema.methods.deleteBook = function(usuario, id, done)
    {
        var deferred = Q.defer();

        if (lib.isStringInvalid(usuario))
        {
            deferred.reject(new Error("Usuario não informado no momento do cadastro de livros."));
            return deferred.promise;
        }

        if (lib.isStringInvalid(id))
        {
            deferred.reject(new Error("ID não informado no momento da deleção de livros."));
            return deferred.promise;
        }

        var query = {usersAllowed: {$in: [usuario]}, _id: id};

        Book.findOneAndRemove(query)
            .exec(function(err, deleted)
            {
                err ? deferred.reject(err)
                    : deferred.resolve();
            })

        return deferred.promise;
    }

    var Book = mongoose.model('Book', bookSchema);

    module.exports = Book;

}(require('mongoose'),
  require('../lib/lib'),
  require('q'),
  require('../schemas/bookSchema').bookSchema))