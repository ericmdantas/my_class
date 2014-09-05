"use strict";

myClass.controller('ClazzDayController', ['$scope', 'lib', 'pageConfig', 'inputMaxLength', 'ClazzDayResource', 'ClazzDay', 'ClazzDayService', 'ClazzService', 'TeacherService', 'StudentService', 'Teacher', 'ClazzResource', 'ModalHelper',
                                function ($scope, lib, pageConfig, inputMaxLength, ClazzDayResource, ClazzDay, ClazzDayService, ClazzService, TeacherService, StudentService, Teacher, ClazzResource, ModalHelper)
{
    $scope.turma = new ClazzDay();
    $scope.cfg = pageConfig;
    $scope.alunos = [];
    $scope.inputMaxLength = inputMaxLength;
    $scope.professores = [];
    $scope.hoje = moment().format('DD/MM/YYYY');
    $scope.clazzesNames = [];
    $scope.informacaoDiaria = [];
    var currentMonthYear = moment().format("MM/YYYY");

    var _getClazzesNames = function()
    {
        var _onSuccess = function(nomes)
        {
            $scope.clazzesNames = nomes;
        }

        ClazzService
            .getAllClazzesProp('name')
            .then(_onSuccess);
    }

    $scope.getClassesDailyInfo = function(monthYear, id)
    {
        var invalidString = lib.isStringInvalid(monthYear) || monthYear.length !== 7;
        var notNumber = lib.isStringInvalid(monthYear) || ("number" !== typeof parseInt(monthYear.substring(0, 2))) || ("number" !== typeof parseInt(monthYear.substring(3, 7)));
        var wrongSeparator = lib.isStringInvalid(monthYear) || (monthYear.indexOf('/') === -1);

        if (invalidString || notNumber || wrongSeparator)
            throw new Error('Não foi informado o ano e mês correto para consulta.');

        monthYear = monthYear.replace('/', '_');

        lib.isStringInvalid(id) ? _getDailyInfoFromAllClazzes(monthYear)
                                : _getDailyInfoByClass(monthYear, id);
    }

    $scope.getStudentsNamesByClass = function(turma)
    {
        var _onSuccess = function(names)
        {
            $scope.alunos = names;
        }

        StudentService
            .getNamesInClazz(turma)
            .then(_onSuccess);
    }

    var _getTeachersNames = function()
    {
        var _onSuccess = function(nomes)
        {
            $scope.professores = nomes;
        };

        TeacherService
            .getAllTeachersProp('name')
            .then(_onSuccess);
    }

    $scope.registerClazzDay = function(turma, alunos)
    {
        var _onSuccess = function()
        {
            $scope.getClassesDailyInfo(currentMonthYear);
            ModalHelper.close('#modal-clazz-day');
            lib.emptyProperty($scope, 'turmaDiaDia', {});
        }

        var _onError = function(error)
        {
            lib.createAlert(null, 'Houve um problema no momento do registro da aula.');
        }

        var _moment = $scope.turma.normalizeClazzDay(turma, alunos, currentMonthYear);

        ClazzDayService
            .save(_moment)
            .then(_onSuccess, _onError);
    }

    var _getDailyInfoFromAllClazzes = function(monthYear)
    {
        var _onSuccess = function(info)
        {
            $scope.informacaoDiaria = info;
        };

        ClazzDayResource
            .query({monthAndYear: monthYear}, _onSuccess)
    }

    var _getDailyInfoByClass = function(monthYear, id)
    {
        var _onSuccess = function(resultado)
        {
            $scope.informacaoDiaria = resultado;
        }

        ClazzDayService
            .getDailyInfoByClazz(monthYear, id)
            .then(_onSuccess);
    }

    $scope.getClassesDailyInfo(currentMonthYear);
    _getClazzesNames();
    _getTeachersNames();
}])