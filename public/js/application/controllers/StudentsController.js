"use strict";

myClass.controller('StudentsController', ['$scope', '$http', 'pageConfig', 'lib_frontend', function ($scope, $http, pageConfig, lib_frontend)
{
    $scope.alunos = [];
    $scope.turmasCadastradas = [];
    $scope.isLoadingVisible = {modal: false};
    $scope.novoAluno = {};
    $scope.alunoEscolhido = {};
    $scope.cfg = pageConfig;

    $scope.getStudents = function()
    {
        $http.get('/api/getStudents')
             .success(function(data)
                      {
                            $scope.alunos = (data && data.students) ? data.students : [];
                      })
    }

    $scope.getClassesNames = function()
    {
        $http.get('/api/getClassesNames')
             .success(function(data)
                     {
                         $scope.turmasCadastradas = (data && data.classes) ? data.classes : [];
                     })
    }

    $scope.getStudents();
    $scope.getClassesNames();

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

    $scope.openModalToDeleteStudent = function(aluno)
    {
        preparaAberturaModal('#modal-delete-student');
        $scope.alunoEscolhido = aluno;
    }

    $scope.openModalToEditStudent = function(aluno)
    {
        preparaAberturaModal('#modal-edit-student');
        $scope.alunoEscolhido = aluno;
    }

    $scope.openModalToRegisterStudent = function()
    {
        preparaAberturaModal('#modal-register-student');
    }

    $scope.registerNewStudent = function(aluno)
    {
        if (!aluno)
            throw new Error('erro: aluno nao informado - registerNewStudent');

        $scope.isLoadingVisible.modal = true;
        aluno.class = aluno.class ? aluno.class.name : '';
        aluno.status = aluno.status ? aluno.status.nome : '';
        aluno.contract = aluno.contract ? aluno.contract.nome : '';
        aluno = lib_frontend.removeWhiteSpaces(aluno);

        $http.post('/api/registerStudent', aluno)
             .success(function()
                      {
                          closesModal('#modal-register-student');
                          emptyProperty('novoAluno');
                      })
    }

    $scope.editStudent = function(aluno)
    {
        if ((!aluno) || (typeof aluno !== "object"))
            throw new Error('Não foi possível editar este aluno. Tente mais tarde.');

        $scope.isLoadingVisible.modal = true;

        aluno.class = aluno.class ? aluno.class.name : '';
        aluno.status = aluno.status ? aluno.status.nome : '';
        aluno.contract = aluno.contract ? aluno.contract.nome : '';

        $http.post('/api/editStudent', aluno)
             .success(function()
                      {
                            closesModal('#modal-edit-student');
                            emptyProperty('alunoEscolhido ');
                      })
    }

    $scope.deleteStudent = function(id)
    {
        if ((!id) || ("object" === typeof id))
            throw new Error('Não foi possível realizar a deleção do aluno. O ID está errado.');

        $scope.isLoadingVisible.modal = true;
        $http.delete('/api/deleteStudent/'+id)
             .success(function()
                    {
                        closesModal('#modal-delete-student');
                        emptyProperty('alunoEscolhido');
                    })
    }

    function closesModal(modalID)
    {
        $scope.getStudents();
        escondeModal(modalID);
    }

    function emptyProperty(propertyToBeEmpty)
    {
        $scope[propertyToBeEmpty] = {};
    }
}])