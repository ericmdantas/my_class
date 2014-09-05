"use strict";

myClass
    .factory('ClazzDayResource', ['$resource', 'baseAPI', function($resource, baseAPI)
    {
        var _url = baseAPI + 'classes/dailyInfo/:id/:monthAndYear';
        var _params = {id: '@id', monthAndYear: '@monthAndYear'};
        var _methods = {update: {method: 'PUT'}};

        return $resource(_url, _params, _methods);
    }])
    .service('ClazzDayService', ['$q', 'lib', 'ClazzDayResource', function($q, lib, ClazzDayResource)
    {
        var _getDailyInfoByClazz = function(monthYear, id)
        {
            var deferred = $q.defer();

            var _onSuccess = function(result)
            {
                /*if (result)
                 {
                     for (var i = 0; i < $scope.informacaoDiaria.length; i++)
                     {
                         if (result._id === $scope.informacaoDiaria[i]._id)
                         {
                             $scope.informacaoDiaria[i] = result;
                             break;
                        }
                    }
                 }
                 else
                 {
                     for (var j = 0; j < $scope.informacaoDiaria.length; j++)
                     {
                         if (id === $scope.informacaoDiaria[j]._id)
                         {
                             $scope.informacaoDiaria[j].dailyInfo = [];
                             break;
                         }
                     }
                 }*/

                deferred.resolve(result);
            }

            var _onError = function(error)
            {
                deferred.reject(error);
            }

            ClazzDayResource
                .query({monthAndYear: monthYear, id: id})
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        };

        var _save = function(momento)
        {
            var deferred = $q.defer();

            if (lib.isObjectInvalid(momento))
            {
                deferred.reject(new Error('Não será possível continuar, pois alguns parâmetros não foram informados.'));
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

            ClazzDayResource
                .save(momento)
                .$promise
                .then(_onSuccess, _onError);

            return deferred.promise;
        }

        this.getDailyInfoByClazz = _getDailyInfoByClazz;
        this.save = _save;
    }])