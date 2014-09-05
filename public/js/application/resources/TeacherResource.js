"use strict";

myClass
    .factory('TeacherResource', ['$resource', 'baseAPI', function($resource, baseAPI)
    {
        var _url = baseAPI + 'teachers/:property/:id';
        var _params = {property: '@property', id: '@id'};
        var _methods = {update: {method: 'PUT'}};

        return $resource(_url, _params, _methods);
    }])
    .service('TeacherService', ['$q', 'lib', 'TeacherResource', 'Teacher', function($q, lib, TeacherResource, Teacher)
    {
        var _getAll = function()
        {
            var deferred = $q.defer();

            var _onSuccess = function(teachers)
            {
                var _teachers = [];

                angular.forEach(teachers, function(teacher)
                {
                    _teachers.push(new Teacher(teacher));
                })

                deferred.resolve(_teachers);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            TeacherResource
                .query()
                .$promise
                .then(_onSuccess, _onError)

            return deferred.promise;
        };

        var _getAllTeachersProp = function(prop)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(prop))
            {
                deferred.reject(new Error('Propriedade não é válida para buscar os professores.'));
                return deferred.promise;
            }

            var _onSuccess = function(teachers)
            {
                var _teachers = teachers || [];
                deferred.resolve(_teachers);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            TeacherResource
                .query({property: prop})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _get = function(id)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(id))
            {
                deferred.reject(new Error('Não é possível buscar o professor com o id informado, pois o mesmo não é uma string válida.'));
                return deferred.promise;
            }

            var _onSuccess = function(teacher)
            {
                deferred.resolve(teacher);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            TeacherResource
                .get({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _save = function(teacher)
        {
            var deferred = $q.defer();

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function()
            {
                deferred.reject();
            }

            TeacherResource
                .save(teacher)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _update = function(teacher)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(teacher._id))
            {
                deferred.reject(new Error('Não é possível editar um professor sem id.'));
                return deferred.promise;
            }

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function()
            {
                deferred.reject();
            }

            TeacherResource
                .update({id: teacher._id}, teacher)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _remove = function(id)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(id))
            {
                deferred.reject(new Error('Não foi possível deletar este professor. Pois o ID está errado.'));
                return deferred.promise;
            }

            var _onSuccess = function()
            {
                deferred.resolve();
            }

            var _onError = function()
            {
                deferred.reject();
            }

            TeacherResource
                .remove({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        this.getAll = _getAll;
        this.getAllTeachersProp = _getAllTeachersProp;
        this.get = _get;
        this.save = _save;
        this.update = _update;
        this.remove = _remove;
    }])