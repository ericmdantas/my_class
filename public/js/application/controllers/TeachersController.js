"use strict";

myClass.controller('TeachersController', ['$scope', '$http', 'pageConfig', 'lib_frontend', function($scope, $http, pageConfig, lib_fronted)
{
    $scope.cfg = pageConfig;
    $scope.professores = [];
    $scope.novoProfessor = {};
    $scope.professorEscolhido = {};
    $scope.isLoadingVisible = {modal: false};

    $scope.getTeachers = function()
    {
        $http.get('/api/getTeachers?u=eric3')
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

    $scope.openModalToDeleteTeacher = function(professor, i)
    {
        preparaAberturaModal('#modal-delete-teacher');
        $scope.professorEscolhido = professor;
        $scope.professorEscolhido.index = i;
    }

    $scope.registerNewTeacher = function(professor)
    {
        $scope.isLoadingVisible.modal = true;
        professor = lib_fronted.removeWhiteSpaces(professor);
        $http.post('/api/registerTeacher?u=eric3', professor)
            .success(function()
            {
                escondeModal('#modal-register-teacher');
                $scope.getTeachers();
            })

        $scope.novoProfessor = {};
    }

    $scope.editTeacher = function(professor)
    {
        $scope.isLoadingVisible.modal = true;
        professor = lib_fronted.removeWhiteSpaces(professor);

        $http.post('/api/editTeacher?u=eric3', professor)
             .success(function()
                       {
                           escondeModal('#modal-edit-teacher');
                           $scope.getTeachers();
                       })

        $scope.professorEscolhido = {};
    }

    $scope.deleteTeacher = function(id)
    {
        if ((!id) || ("object" === typeof id))
            throw new Error('Não foi possível deletar este professor. Pois o ID está errado.');

        $scope.isLoadingVisible.modal = true;

        $http.delete('/api/deleteTeacher/'+id+'?u=eric3')
             .success(function()
                     {
                         escondeModal('#modal-delete-teacher');
                         $scope.getTeachers();
                     })
    }
}])