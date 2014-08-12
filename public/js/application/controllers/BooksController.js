"use strict";

myClass.controller('BooksController', ['$scope', 'BookResource', 'pageConfig', 'inputMaxLength', 'lib', 'ModalHelper',
                               function($scope, BookResource, pageConfig, inputMaxLength, lib, ModalHelper)
{
    $scope.livros = [];
    $scope.cfg = pageConfig;
    $scope.inputMaxLength = inputMaxLength;
    $scope.livroEscolhido = {};
    $scope.novoLivro = {};
    $scope.isLoadingVisible = {modal: false};

    var _getBooks = function()
    {
        var _onSuccess = function(data)
        {
            $scope.livros = data || [];
        }

        BookResource
            .query(_onSuccess);
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

        var _onSuccess = function()
        {
            _getBooks();
            ModalHelper.close('#modal-register-book');
            lib.emptyProperty($scope, 'novoLivro', {});
        };

        $scope.isLoadingVisible.modal = true;

        BookResource
            .save(livro, _onSuccess);
    }

    $scope.editBook = function(livro)
    {
        if (lib.isObjectInvalid(livro) || (lib.isStringInvalid(livro._id)))
            throw new Error('Ocorreu um erro na edição do livro. Não foi especificado um livro.');

        var _onSuccess = function()
        {
            _getBooks();
            ModalHelper.close('#modal-edit-book');
            lib.emptyProperty($scope, 'livroEscolhido', {});
        }

        $scope.isLoadingVisible.modal = true;

        BookResource
            .update({id: livro._id}, livro, _onSuccess);
    }

    $scope.deleteBook = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.');

        var _onSuccess = function()
        {
            _getBooks();
            ModalHelper.close('#modal-delete-book');
            lib.emptyProperty($scope, 'livroEscolhido', {});
        };

        $scope.isLoadingVisible.modal = true;

        BookResource
            .remove({id: id}, _onSuccess);
    }

    _getBooks();
}])