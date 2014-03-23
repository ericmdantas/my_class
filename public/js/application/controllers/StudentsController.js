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
        $http.get('/api/getStudents?u=eric3')
             .success(function(data)
                      {
                            $scope.alunos = (data && data.students && data.students.students) ? data.students.students : [];
                            $scope.turmasCadastradas = (data && data.students && data.students.classes) ? data.students.classes : [];
                      })
    }

    $scope.getStudents();

    $scope.openModalToDeleteStudent = function(aluno, i)
    {
        $scope.isLoadingVisible.modal = false;
        $("#modal-delete-student").modal({keyboard: true});
        $scope.alunoEscolhido = aluno;
        $scope.alunoEscolhido.index = i;
    }

    $scope.openModalToEditStudent = function(aluno, i)
    {
        $scope.isLoadingVisible.modal = false;
        $("#modal-edit-student").modal({keyboard: true});
        $scope.alunoEscolhido = aluno;
        $scope.alunoEscolhido.index = i;
    }

    $scope.openModalToRegisterStudent = function()
    {
        $('#modal-register-student').modal({keyboard: true});
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

        $http.post('/api/registerStudent?u=eric3', aluno)
             .success(function()
                      {
                          $scope.getStudents();
                          $scope.isLoadingVisible.modal = false;
                          $('#modal-register-student').modal('hide');
                          $scope.novoAluno = {};
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

        $http.post('/api/editStudent?u=eric3', aluno)
             .success(function()
                      {
                            $scope.getStudents();
                            $scope.isLoadingVisible.modal = false;
                            $('#modal-edit-student').modal('hide');
                            $scope.alunoEscolhido = {};
                      })
    }

    $scope.deleteStudent = function(id)
    {
        if ((!id) || ("object" === typeof id))
            throw new Error('Não foi possível realizar a deleção do aluno. O ID está errado.');

        $scope.isLoadingVisible.modal = true;
        $http.delete('/api/deleteStudent?u=eric3&s='+id)
             .success(function()
                    {
                        $scope.getStudents();
                        $('#modal-delete-student').modal('hide');
                        $scope.isLoadingVisible.modal = false;
                    })
    }
}])