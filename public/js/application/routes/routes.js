"use strict";

myClass.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/principal', {templateUrl: 'partials/main.html'})
        .when('/aulas', {templateUrl: 'partials/classDays.html'})
        .when('/turmas', {templateUrl: 'partials/classes.html'})
        .when('/professores', {templateUrl: 'partials/teachers.html'})
        .when('/alunos', {templateUrl: 'partials/students.html'})
        .when('/livros', {templateUrl: 'partials/books.html'})
        .when('/pagamentos', {templateUrl: 'partials/payments.html'})
        .when('/estatisticas', {templateUrl: 'partials/statistics.html'})
        .otherwise({redirectTo: '/principal'});

    $locationProvider.html5Mode(true);
}]);