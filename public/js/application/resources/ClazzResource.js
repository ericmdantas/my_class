"use strict";

myClass
    .factory('ClazzResource', ['$resource', 'baseAPI', function($resource, baseAPI)
    {
        var _url = baseAPI + 'classes/:property/:id/:monthYear';
        var _params = {property: '@property', id: '@id', monthYear: '@monthYear'};
        var _methods = {update: {method: 'PUT'}};

        return $resource(_url, _params, _methods);
    }])
    .service('ClazzService', ['$q', 'lib', 'ClazzResource', 'Clazz', function($q, lib, ClazzResource, Clazz)
    {
        var _getAll = function()
        {
            var deferred = $q.defer();

            var _onSuccess = function(clazzes)
            {
                var _clazzes = [];

                angular.forEach(clazzes, function(clazz)
                {
                    _clazzes.push(new Clazz(clazz));
                })

                deferred.resolve(_clazzes);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            ClazzResource
                .query()
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _getAllClazzesProp = function(prop)
        {
            var deferred = $q.defer();
            var _obj = ("object" === typeof prop) ? prop : {property: prop};

            var _onSuccess = function(clazzes)
            {
                deferred.resolve(clazzes);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            ClazzResource
                .query(_obj)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _get = function(id)
        {
            var deferred = $q.defer();
            var _id = ("object" === typeof id) ? id : {id: id};

            if (lib.isStringInvalid(id))
            {
                deferred.reject(new Error('Não é possível buscar as informações específicas desta turma. Id inválido.'))
                return deferred.promise;
            }

            var _onSuccess = function(clazz)
            {
                deferred.resolve(clazz);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            ClazzResource
                .get(_id)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _save = function(clazz)
        {
            var deferred = $q.defer();

            if (lib.isObjectInvalid(clazz))
            {
                deferred.reject(new Error('Não foi possível registrar esta turma. Inválida.'));
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

            ClazzResource
                .save(clazz)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _update = function(clazz)
        {
            var deferred = $q.defer();

            if (lib.isObjectInvalid(clazz))
            {
                deferred.reject(new Error('Não foi possível editar esta turma. Turma inválida.'));
                return deferred.promise;
            }

            if (lib.isStringInvalid(clazz._id))
            {
                deferred.reject(new Error('Não foi possível editar esta turma. Id inválido.'));
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

            ClazzResource
                .update({id: clazz._id}, clazz)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _remove = function(id)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(id))
            {
                deferred.reject(new Error('Não foi possível deletar esta turma. Id inválido.'));
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

            ClazzResource
                .remove({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        this.getAll = _getAll;
        this.getAllClazzesProp = _getAllClazzesProp;
        this.get = _get;
        this.save = _save;
        this.update = _update;
        this.remove = _remove;
    }])