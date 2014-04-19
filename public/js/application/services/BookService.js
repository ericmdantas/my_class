"use strict";

myClass.factory('BookService', ['$http', function($http)
{
    var URL = '/api/books';

    function _getBooks()
    {
        return $http.get(URL);
    }

    function _registerBook(livro)
    {
        return $http.post(URL, livro);
    }

    function _editBook(id, livro)
    {
        return $http.put(URL + '/' + id, livro);
    }

    function _deleteBook(id)
    {
        return $http.delete(URL + '/' + id);
    }

    return {
                getBooks: _getBooks,
                registerBook: _registerBook,
                editBook: _editBook,
                deleteBook: _deleteBook
           }
}])