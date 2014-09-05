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
                                             var _status = (rejection && rejection.data && rejection.data.errorStatus) ? rejection.data.errorStatus
                                                                                                                       : null;

                                             var _message = (rejection && rejection.data && rejection.data.errorMessage) ? rejection.data.errorMessage
                                                                                                                         : null;

                                             lib.createAlert(_status, _message);
                                             return $q.reject(rejection);
                                         }
                                    };
                         }]);

                         $httpProvider.interceptors.push('Interceptus')
                     }])