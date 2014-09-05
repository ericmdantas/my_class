"use strict";

myClass
    .factory('BookResource', ['$resource', 'baseAPI', function($resource, baseAPI)
    {
        var _url = baseAPI + 'books/:id';
        var _params = {id: '@id'};
        var _methods = {update: {method: 'PUT'}};

        return $resource(_url, _params, _methods);
    }])
    .service('BookService', ['$q', 'lib', 'BookResource', 'Book', function($q, lib, BookResource, Book)
    {
        var _getAll = function()
        {
            var deferred = $q.defer();

            var _onSuccess = function(books)
            {
                var _books = [];

                angular.forEach(books, function(book)
                {
                    _books.push(new Book(book));
                })

                deferred.resolve(_books);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            BookResource
                .query()
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _get = function(id)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(id))
            {
                deferred.reject('Não é possível buscar o livro pelo id, pois o mesmo não é válido.');
                return deferred.promise;
            }

            var _onSuccess = function(book)
            {
                deferred.resolve(book);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            BookResource
                .get({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _save = function(livro)
        {
            var deferred = $q.defer();

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            BookResource
                .save(livro)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _update = function(livro)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(livro._id))
            {
                deferred.reject(new Error('Ocorreu um erro na edição do livro. Não foi especificado o id do livro.'));
                return deferred.promise;
            }

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            BookResource
                .update({id: livro._id}, livro)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _remove = function(id)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(id))
            {
                deferred.reject(new Error('Ocorreu um erro na deleção do livro. Não há um id identificado.'));
                return deferred.promise;
            }

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            BookResource
                .remove({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        this.getAll = _getAll;
        this.get = _get;
        this.save = _save;
        this.update = _update;
        this.remove = _remove;
    }])
