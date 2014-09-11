"use strict";

myClass.controller('ClassesController', ['$scope', '$timeout', 'lib', 'pageConfig', 'inputMaxLength', 'Clazz', 'ClazzService', 'StudentService', 'ModalHelper',
                                function ($scope, $timeout, lib, pageConfig, inputMaxLength, Clazz, ClazzService, StudentService, ModalHelper)
{
    $scope.turma = new Clazz();
    $scope.turmas = [];
    $scope.cfg = pageConfig;
    $scope.inputMaxLength = inputMaxLength;
    $scope.alunos = {};
    $scope.professores = {};

    var _getClasses = function()
    {
        var _onSuccess = function(turmas)
        {
            $scope.turmas = turmas;

            if (!$scope.turmas.length)
            {
                ModalHelper.open('#modal-clazz');
            }
        };

        ClazzService
            .getAll()
            .then(_onSuccess);
    }

    var _getStudentsNames = function()
    {
        var _onSuccess = function(alunos)
        {
            $scope.alunos = alunos;

            for (var i = 0; i < alunos.length; i++)
            {
                $scope.alunos[i] = alunos[i].name;
            }

            $('#alunos-nova-turma').select2();
        };

        StudentService
            .getAllStudentsByProp('name')
            .then(_onSuccess);
    }

    $scope.setClazz = function(turma)
    {
        $scope.turma = new Clazz(turma);
    }

    $scope.startSelect2 = function()
    {
        $timeout(function()
        {
            $('#alunos-turma-editada').select2().trigger('change');
        }, 0);
    }

    $scope.registerClass = function(turma)
    {
        var _onSuccess = function()
        {
            _getClasses();
            ModalHelper.close('#modal-clazz');
        };

        ClazzService
            .save(turma)
            .then(_onSuccess);
    }

    $scope.editClass = function(turma)
    {
        var _onSuccess = function()
        {
            _getClasses();
            ModalHelper.close('#modal-clazz');
        };

        ClazzService
            .update(turma)
            .then(_onSuccess);
    }

    $scope.deleteClass = function(id)
    {
        var _onSuccess = function()
        {
            _getClasses();
            ModalHelper.close('#modal-delete-class');
        };

        ClazzService
            .remove(id)
            .then(_onSuccess);
    }

    _getClasses();
    _getStudentsNames();
}])