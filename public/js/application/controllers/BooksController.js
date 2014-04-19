"use strict";

myClass.controller('BooksController', ['$scope', '$http', 'pageConfig', 'BookService', 'lib', function($scope, $http, pageConfig, BookService, lib)
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

    $scope.getBooks();

    function preparaAberturaModal(idModal)
    {
        $scope.isLoadingVisible.modal = false;
        $(idModal).modal('show');
    }

    function escondeModal(idModal)
    {
        $(idModal).modal('hide');
        $scope.isLoadingVisible.modal = false;
    }

    $scope.openModalToEditBook = function(livro)
    {
        preparaAberturaModal('#modal-edit-book');
        $scope.livroEscolhido = livro;
    }

    $scope.openModalToDeleteBook = function(livro)
    {
        preparaAberturaModal('#modal-delete-book');
        $scope.livroEscolhido = livro;
    }

    $scope.openModalToRegisterBook = function()
    {
        preparaAberturaModal('#modal-register-book');
    }

    $scope.registerBook = function(livro)
    {
        if (lib.isObjectInvalid(livro))
           throw new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.')

        $scope.isLoadingVisible.modal = true;

        BookService.registerBook(livro)
                   .success(function()
                           {
                               closesModal('#modal-register-book');
                               emptyProperty('novoLivro');
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
                              closesModal('#modal-edit-book');
                              emptyProperty('livroEscolhido');
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
                               closesModal('#modal-delete-book');
                               emptyProperty('livroEscolhido');
                           });
    }

    function closesModal(modalID)
    {
        $scope.getBooks();
        escondeModal(modalID);
    }

    function emptyProperty(propertyToBeEmpty)
    {
        $scope[propertyToBeEmpty] = {};
    }
}])