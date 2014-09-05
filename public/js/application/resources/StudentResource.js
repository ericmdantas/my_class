"use strict";

myClass
    .factory('StudentResource', ['$resource', 'baseAPI', function($resource, baseAPI)
    {
        var _url = baseAPI + 'students/:property/:id/:clazz';
        var _params = {id: '@id', property: '@property', clazz: '@clazz'};
        var _methods = {update: {method: 'PUT'},
                        getNames: {method: 'GET', isArray: true, url: baseAPI + 'students/name/:clazz'}};

        return $resource(_url, _params, _methods);
    }])
    .service('StudentService', ['$q', 'lib', 'StudentResource', 'Student', function($q, lib, StudentResource, Student)
    {
        var _getAll = function()
        {
            var deferred = $q.defer();

            var _onSuccess = function(students)
            {
                var _students = [];

                angular.forEach(students, function(student)
                {
                    _students.push(new Student(student));
                })

                deferred.resolve(_students);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            StudentResource
                .query()
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _getAllStudentsByProp = function(prop)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(prop))
            {
                deferred.reject(new Error('Não é possível buscar os alunos pela propriedade passada, pois a mesma não é válida.'));
                return deferred.promise;
            }

            var _onSuccess = function(students)
            {
                var _students = students || [];

                deferred.resolve(_students);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            StudentResource
                .query({property: prop})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _getNamesInClazz = function(turma)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(turma))
            {
                deferred.reject(new Error('Não é possível buscar os alunos por turma, pois o nome passado não é válido.'));
                return deferred.promise;
            }

            var _onSuccess = function(names)
            {
                for (var i = 0; i < names.length; i++)
                {
                    names[i].wasInClass = true;
                }

                deferred.resolve(names);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            StudentResource
                .getNames({clazz: turma})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _get = function(id)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(id))
            {
                deferred.reject(new Error('Não é possível buscar as informações. Id Inválido.'));
                return deferred.promise;
            }

            var _onSuccess = function(student)
            {
                deferred.resolve(student);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            StudentResource
                .get({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _save = function(student)
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

            StudentResource
                .save(student)
                .$promise
                .then(_onSuccess, _onError)

            return deferred.promise;
        };

        var _update = function(student)
        {
            var deferred = $q.defer();

            if (lib.isObjectInvalid(student))
            {
                deferred.reject(new Error('Não é possível editar o aluno, objeto inválido.'));
                return deferred.promise;
            }

            if (lib.isStringInvalid(student._id))
            {
                deferred.reject(new Error('Não é possível editar o aluno, pois o id não é válido.'));
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

            StudentResource
                .update({id: student._id}, student)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _remove = function(id)
        {
            var deferred = $q.defer();

            if (lib.isStringInvalid(id))
            {
                deferred.reject(new Error('Não é possível excluir o aluno, pois o id não é válido.'));
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

            StudentResource
                .remove({id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        this.getAll = _getAll;
        this.getAllStudentsByProp = _getAllStudentsByProp;
        this.getNamesInClazz = _getNamesInClazz;
        this.get = _get;
        this.save = _save;
        this.update = _update;
        this.remove = _remove;
    }])