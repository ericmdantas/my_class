"use strict";

myClass.controller('TeachersController', ['$scope', 'pageConfig', 'inputMaxLength', 'lib', 'TeacherService', 'ModalHelper',
                                  function($scope, pageConfig, inputMaxLength, lib, TeacherService, ModalHelper)
{
    $scope.cfg = pageConfig;
    $scope.professores = [];
    $scope.novoProfessor = {};
    $scope.inputMaxLength = inputMaxLength;
    $scope.professorEscolhido = {};
    $scope.isLoadingVisible = {modal: false};

    $scope.getTeachers = function()
    {
        TeacherService.getTeachers()
             .success(function(data)
                      {
                          $scope.professores = (data && data.resultado) ? data.resultado : [];
                      })
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

        professor = lib.removeWhiteSpaces(professor);

        TeacherService.registerTeacher(professor)
            .success(function()
            {
                $scope.getTeachers();
                ModalHelper.close('#modal-register-teacher');
                lib.emptyProperty($scope, 'novoProfessor', {});
            })
    }

    $scope.editTeacher = function(professor)
    {
        $scope.isLoadingVisible.modal = true;

        if (lib.isObjectInvalid(professor) || lib.isStringInvalid(professor._id))
            throw new Error('Não é possível editar um professor sem informações.');

        professor = lib.removeWhiteSpaces(professor);

        TeacherService.editTeacher(professor._id, professor)
             .success(function()
                       {
                           $scope.getTeachers();
                           ModalHelper.close('#modal-edit-teacher');
                           lib.emptyProperty($scope, 'professorEscolhido', {});
                       })
    }

    $scope.deleteTeacher = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não foi possível deletar este professor. Pois o ID está errado.');

        $scope.isLoadingVisible.modal = true;

        TeacherService.deleteTeacher(id)
             .success(function()
                     {
                         $scope.getTeachers();
                         ModalHelper.close('#modal-delete-teacher');
                         lib.emptyProperty($scope, 'professorEscolhido', {});
                     })
    }

    $scope.getTeachers();
}])