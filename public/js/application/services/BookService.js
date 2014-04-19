"use strict";

myClass.factory('BookService', ['$http', 'lib', function($http, lib)
{
    var URL = '/api/books';

    function _getBooks()
    {
        return $http.get(URL);
    }

    function _registerBook(livro)
    {
        if (lib.isObjectInvalid(livro))
            throw new Error('Não é possível cadastrar o livro. Parâmetros informados de forma errada.');

        return $http.post(URL, livro);
    }

    function _editBook(id, livro)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não é possível editar o livro. Id informado de forma errada.');

        if (lib.isObjectInvalid(livro))
            throw new Error('Não é possível editar o livro. Livro informado de forma errada.');

        return $http.put(URL + '/' + id, livro);
    }

    function _deleteBook(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não é possível deletar o livro. Id informado de forma errada.');

        return $http.delete(URL + '/' + id);
    }

    return {
                getBooks: _getBooks,
                registerBook: _registerBook,
                editBook: _editBook,
                deleteBook: _deleteBook
           }
}])