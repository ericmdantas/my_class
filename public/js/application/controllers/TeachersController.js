"use strict";

myClass.controller('TeachersController', ['$scope', 'pageConfig', 'inputMaxLength', 'lib', 'Teacher', 'TeacherService', 'ModalHelper',
                                  function($scope, pageConfig, inputMaxLength, lib, Teacher, TeacherService,ModalHelper)
{
    $scope.professor = new Teacher();
    $scope.cfg = pageConfig;
    $scope.professores = [];
    $scope.inputMaxLength = inputMaxLength;

    var _getTeachers = function()
    {
        var _onSuccess = function(professores)
        {
            $scope.professores = professores;

            if (!$scope.professor.length)
            {
                ModalHelper.open('#modal-teacher');
            }
        }

        var _onError = function(error)
        {
            lib.createAlert(null, 'Houve um erro no momento da consulta de todos os professores.');
        }

        TeacherService
            .getAll()
            .then(_onSuccess, _onError);
    }

    $scope.resetTeacher = function()
    {
        $scope.professor = new Teacher();
    }

    $scope.setTeacher = function(professor)
    {
        $scope.professor = new Teacher(professor);
    }

    $scope.registerNewTeacher = function(professor)
    {
        var _onSuccess = function()
        {
            _getTeachers();
            ModalHelper.close('#modal-teacher');
        }

        var _onError = function()
        {
            lib.createAlert(null, error.message);
        }

        TeacherService
            .save(professor)
            .then(_onSuccess, _onError);
    }

    $scope.editTeacher = function(professor)
    {
        var _onSuccess = function()
        {
            _getTeachers();
            ModalHelper.close('#modal-teacher');
        }

        var _onError = function(error)
        {
            lib.createAlert(null, 'Houve um erro no momento da edição do professor.');
        }

        TeacherService
            .update(professor)
            .then(_onSuccess, _onError);
    }

    $scope.deleteTeacher = function(id)
    {
        var _onSuccess = function()
        {
            _getTeachers();
            ModalHelper.close('#modal-delete-teacher');
        };

        var _onError = function()
        {
            lib.createAlert(null, 'Houve um erro no momento da deleção do professor.');
        }

        TeacherService
            .remove(id)
            .then(_onSuccess, _onError);
    }

    _getTeachers();
}])