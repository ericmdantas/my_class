"use strict";

myClass.controller('TeachersController', ['$scope', 'pageConfig', 'inputMaxLength', 'lib', 'TeacherResource', 'ModalHelper',
                                  function($scope, pageConfig, inputMaxLength, lib, TeacherResource, ModalHelper)
{
    $scope.cfg = pageConfig;
    $scope.professores = [];
    $scope.novoProfessor = {};
    $scope.inputMaxLength = inputMaxLength;
    $scope.professorEscolhido = {};
    $scope.isLoadingVisible = {modal: false};

    var _getTeachers = function()
    {
        var _onSuccess = function(data)
        {
            $scope.professores = data || [];
        }

        TeacherResource
            .query(_onSuccess);
    }

    $scope.openModalToRegisterTeacher = function()
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-register-teacher');
    }

    $scope.openModalToEditTeacher = function(professor)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-edit-teacher');
        $scope.professorEscolhido = professor;
    }

    $scope.openModalToDeleteTeacher = function(professor)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-delete-teacher');
        $scope.professorEscolhido = professor;
    }

    $scope.registerNewTeacher = function(professor)
    {
        $scope.isLoadingVisible.modal = true;

        if (lib.isObjectInvalid(professor))
            throw new Error('Não é possível cadastrar um professor sem informações.');

        var _onSuccess = function()
        {
            _getTeachers();
            ModalHelper.close('#modal-register-teacher');
            lib.emptyProperty($scope, 'novoProfessor', {});
        };

        professor = lib.removeWhiteSpaces(professor);

        TeacherResource
            .save(professor, _onSuccess);
    }

    $scope.editTeacher = function(professor)
    {
        $scope.isLoadingVisible.modal = true;

        if (lib.isObjectInvalid(professor) || lib.isStringInvalid(professor._id))
            throw new Error('Não é possível editar um professor sem informações.');

        var _onSuccess = function()
        {
            _getTeachers();
            ModalHelper.close('#modal-edit-teacher');
            lib.emptyProperty($scope, 'professorEscolhido', {});
        };

        professor = lib.removeWhiteSpaces(professor);

        TeacherResource
            .update({id: professor._id}, professor, _onSuccess);
    }

    $scope.deleteTeacher = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não foi possível deletar este professor. Pois o ID está errado.');

        var _onSuccess = function()
        {
            _getTeachers();
            ModalHelper.close('#modal-delete-teacher');
            lib.emptyProperty($scope, 'professorEscolhido', {});
        };

        $scope.isLoadingVisible.modal = true;

        TeacherResource
            .remove({id: id}, _onSuccess);
    }

    _getTeachers();
}])