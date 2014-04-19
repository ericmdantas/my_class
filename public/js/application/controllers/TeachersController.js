"use strict";

myClass.controller('TeachersController', ['$scope', '$http', 'pageConfig', 'lib', 'TeacherService',
                                  function($scope, $http, pageConfig, lib, TeacherService)
{
    $scope.cfg = pageConfig;
    $scope.professores = [];
    $scope.novoProfessor = {};
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

    $scope.getTeachers();

    function preparaAberturaModal(idModal)
    {
        $scope.isLoadingVisible.modal = false;
        $(idModal).modal('show');
    }

    function escondeModal(idModal)
    {
        $(idModal).modal('hide');
        $scope.isLoadingVisible.modal = false;
    }

    $scope.openModalToRegisterTeacher = function()
    {
        preparaAberturaModal('#modal-register-teacher');
    }

    $scope.openModalToEditTeacher = function(professor)
    {
        preparaAberturaModal('#modal-edit-teacher');
        $scope.professorEscolhido = professor;
    }

    $scope.openModalToDeleteTeacher = function(professor)
    {
        preparaAberturaModal('#modal-delete-teacher');
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
                closesModal('#modal-register-teacher');
                emptyProperty('novoProfessor');
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
                           closesModal('#modal-edit-teacher');
                           emptyProperty('professorEscolhido');
                       })

        $scope.professorEscolhido = {};
    }

    $scope.deleteTeacher = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não foi possível deletar este professor. Pois o ID está errado.');

        $scope.isLoadingVisible.modal = true;

        TeacherService.deleteTeacher(id)
             .success(function()
                     {
                         closesModal('#modal-delete-teacher');
                         emptyProperty('professorEscolhido');
                     })
    }

    function closesModal(modalID)
    {
        $scope.getTeachers();
        escondeModal(modalID);
    }

    function emptyProperty(propertyToBeEmpty)
    {
        $scope[propertyToBeEmpty] = {};
    }
}])