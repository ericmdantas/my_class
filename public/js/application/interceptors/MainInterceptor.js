"use strict";

myClass.config(['$provide', '$httpProvider', function($provide, $httpProvider)
                     {
                         $provide.factory('Interceptus', ['$q', 'lib', function($q, lib)
                         {
                             return {
                                         request: function(config)
                                         {
                                             return config || $q.when(config);
                                         },
                                         requestError: function(rejection)
                                         {
                                             return $q.reject(rejection);
                                         },
                                         response: function(response)
                                         {
                                             return response || $q.when(response);
                                         },
                                         responseError: function(rejection)
                                         {
                                             lib.createAlert(rejection.data.errorStatus, rejection.data.errorMessage);
                                             return $q.reject(rejection);
                                         }
                                    };
                         }]);

                         $httpProvider.interceptors.push('Interceptus')
                     }])