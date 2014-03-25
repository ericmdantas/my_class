"use strict";

myClass.controller('BooksController', ['$scope', '$http', 'pageConfig', function($scope, $http, pageConfig)
{
    $scope.livros = [];
    $scope.cfg = pageConfig;
    $scope.livroEscolhido = {};
    $scope.novoLivro = {};
    $scope.isLoadingVisible = {modal: false};
    var getURL = '/api/getBooks',
        registerURL = '/api/registerBook',
        deleteURL = '/api/deleteBook',
        usernameParam = '?u=eric3';

    $scope.getBooks = function()
    {
        $http.get(getURL + usernameParam)
             .success(function(data)
                      {
                          $scope.livros = (data && data.books) ? data.books : [];
                      })
    }

    $scope.getBooks();

    $scope.openModalToEditBook = function(livro, i)
    {
        $('#modal-edit-book').modal({keyboard: true});
        $scope.isLoadingVisible.modal = false;
        $scope.livroEscolhido = livro;
        $scope.livroEscolhido.index = i;
    }

    $scope.openModalToDeleteBook = function(livro, i)
    {
        $('#modal-delete-book').modal({keyboard: true});
        $scope.isLoadingVisible.modal = false;
        $scope.livroEscolhido = livro;
        $scope.livroEscolhido.index = i;
    }

    $scope.openModalToRegisterBook = function()
    {
        $('#modal-register-book').modal({keyboard: true});
        $scope.isLoadingVisible.modal = false;
    }

    $scope.registerBook = function(livro)
    {
        if ((!livro) || (typeof livro !== "object"))
           throw new Error('Não foi possível cadastrar este livro, pois o mesmo não existe.')

        $scope.isLoadingVisible.modal = true;

        $http.post(registerURL + usernameParam, livro)
            .success(function()
            {
                $('#modal-register-book').modal('hide');
                $scope.isLoadingVisible.modal = false;
                $scope.getBooks();
            });

        $scope.novoLivro = {};
    }

    $scope.editBook = function(livro)
    {
        if ((!livro) || ("object" !== typeof livro))
            throw new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.');

        $scope.isLoadingVisible.modal = true;

        $http.post('/api/editBook?u=eric3', livro)
             .success(function()
                      {
                            $('#modal-edit-book').modal('hide');
                            $scope.isLoadingVisible.modal = false;
                            $scope.getBooks();
                      })
    }

    $scope.deleteBook = function(id)
    {
        if ((!id) || "object" === typeof id)
            throw new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.');

        $scope.isLoadingVisible.modal = true;

        $http.delete(deleteURL + '/' + id + usernameParam)
            .success(function()
            {
                $scope.isLoadingVisible.modal = false;
                $('#modal-delete-book').modal('hide');
                $scope.getBooks();
                $scope.livroEscolhido = {};
            });
    }
}])