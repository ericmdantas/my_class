"use strict";

myClass.controller('BooksController', ['$scope', 'BookService', 'Book', 'pageConfig', 'inputMaxLength', 'lib', 'ModalHelper',
                               function($scope, BookService, Book, pageConfig, inputMaxLength, lib, ModalHelper)
{
    $scope.livro = new Book();
    $scope.livros = [];
    $scope.cfg = pageConfig;
    $scope.inputMaxLength = inputMaxLength;

    var _getBooks = function()
    {
        var _onSuccess = function(livros)
        {
            $scope.livros = livros;
        }

        BookService
            .getAll()
            .then(_onSuccess);
    }

    $scope.resetBook = function()
    {
        $scope.livro = new Book();
    }

    $scope.setBook = function(livro)
    {
        $scope.livro = new Book(livro);
    }

    $scope.registerBook = function(livro)
    {
        var _onSuccess = function()
        {
            _getBooks();
            ModalHelper.close('#modal-book');
        }

        var _onError = function(error)
        {
            lib.createAlert(null, error.message);
        }

        BookService
            .save(livro)
            .then(_onSuccess, _onError);
    }

    $scope.editBook = function(livro)
    {
        var _onSuccess = function()
        {
            _getBooks();
            ModalHelper.close('#modal-book');
        }

        var _onError = function(error)
        {
            lib.createAlert(null, error.message);
        }

        BookService
            .update(livro)
            .then(_onSuccess, _onError);
    }

    $scope.deleteBook = function(id)
    {
        var _onSuccess = function()
        {
            _getBooks();
            ModalHelper.close('#modal-delete-book');
        };

        var _onError = function(error)
        {
            lib.createAlert(null, error.message);
        }

        BookService
            .remove(id)
            .then(_onSuccess, _onError);
    }

    _getBooks();
}])