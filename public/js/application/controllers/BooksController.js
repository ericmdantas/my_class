"use strict";

myClass.controller('BooksController', ['$scope', '$http', 'pageConfig', function($scope, $http, pageConfig)
{
    $scope.livros = [];
    $scope.cfg = pageConfig;
    $scope.livroEscolhido = {};
    $scope.novoLivro = {};
    $scope.isLoadingVisible = {modal: false};

    $scope.getBooks = function()
    {
        $http.get('/api/books')
             .success(function(data)
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
        if ((!livro) || (typeof livro !== "object"))
           throw new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.')

        $scope.isLoadingVisible.modal = true;

        $http.post('/api/books', livro)
             .success(function()
                     {
                         closesModal('#modal-register-book');
                         emptyProperty('novoLivro');
                     });
    }

    $scope.editBook = function(livro)
    {
        if ((!livro) || ("object" !== typeof livro) || (!livro._id))
            throw new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.');

        $scope.isLoadingVisible.modal = true;

        $http.put('/api/books/'+livro._id, livro)
             .success(function()
                     {
                         closesModal('#modal-edit-book');
                         emptyProperty('livroEscolhido');
                     })
    }

    $scope.deleteBook = function(id)
    {
        if ((!id) || "object" === typeof id)
            throw new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.');

        $scope.isLoadingVisible.modal = true;

        $http.delete('/api/books/'+id)
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