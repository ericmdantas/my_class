"use strict";

var configuration = {};

configuration.routes = ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
                {
                    $routeProvider.when('/principal', {templateUrl: 'partials/main.html'})
                                  .when('/aulas', {templateUrl: 'partials/classDays.html'})
                                  .when('/turmas', {templateUrl: 'partials/classes.html'})
                                  .when('/professores', {templateUrl: 'partials/teachers.html'})
                                  .when('/alunos', {templateUrl: 'partials/students.html'})
                                  .when('/livros', {templateUrl: 'partials/books.html'})
                                  .when('/pagamentos', {templateUrl: 'partials/payments.html'})
                                  .when('/estatisticas', {templateUrl: 'partials/statistics.html'})
                                  .otherwise({redirectTo: '/principal'});

                    $locationProvider.html5Mode(true);
                }];

configuration.interceptors = ['$provide', '$httpProvider', function($provide, $httpProvider)
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
                     }]