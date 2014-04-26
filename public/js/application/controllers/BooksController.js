"use strict";

myClass.controller('BooksController', ['$scope', '$http', 'pageConfig', 'BookService', 'lib', 'ModalHelper',
                               function($scope, $http, pageConfig, BookService, lib, ModalHelper)
{
    $scope.livros = [];
    $scope.cfg = pageConfig;
    $scope.livroEscolhido = {};
    $scope.novoLivro = {};
    $scope.isLoadingVisible = {modal: false};

    $scope.getBooks = function()
    {
        BookService.getBooks().success(function(data)
                                      {
                                          $scope.livros = (data && data.books) ? data.books : [];
                                      })
    }

    $scope.openModalToEditBook = function(livro)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-edit-book');
        $scope.livroEscolhido = livro;
    }

    $scope.openModalToDeleteBook = function(livro)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-delete-book');
        $scope.livroEscolhido = livro;
    }

    $scope.openModalToRegisterBook = function()
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-register-book');
    }

    $scope.registerBook = function(livro)
    {
        if (lib.isObjectInvalid(livro))
           throw new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.')

        $scope.isLoadingVisible.modal = true;

        BookService.registerBook(livro)
                   .success(function()
                           {
                               $scope.getBooks();
                               ModalHelper.close('#modal-register-book');
                               lib.emptyProperty($scope, 'novoLivro', {});
                           });
    }

    $scope.editBook = function(livro)
    {
        if (lib.isObjectInvalid(livro) || (lib.isStringInvalid(livro._id)))
            throw new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.');

        $scope.isLoadingVisible.modal = true;

        BookService.editBook(livro._id, livro)
                   .success(function()
                           {
                              $scope.getBooks();
                              ModalHelper.close('#modal-edit-book');
                              lib.emptyProperty($scope, 'livroEscolhido', {});
                           })
    }

    $scope.deleteBook = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.');

        $scope.isLoadingVisible.modal = true;

        BookService.deleteBook(id)
                   .success(function()
                           {
                               $scope.getBooks();
                               ModalHelper.close('#modal-delete-book');
                               lib.emptyProperty($scope, 'livroEscolhido', {});
                           });
    }

    $scope.getBooks();
}])