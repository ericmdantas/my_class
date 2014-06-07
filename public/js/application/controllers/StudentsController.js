"use strict";

myClass.controller('StudentsController', ['$scope', 'pageConfig', 'inputMaxLength', 'studentStatus', 'contractsTypes', 'lib', 'StudentService', 'ClazzService', 'ModalHelper',
                                function ($scope, pageConfig, inputMaxLength, studentStatus, contractsTypes, lib, StudentService, ClazzService, ModalHelper)
{
    $scope.alunos = [];
    $scope.turmasCadastradas = [];
    $scope.isLoadingVisible = {modal: false};
    $scope.novoAluno = {};
    $scope.alunoEscolhido = {};
    $scope.inputMaxLength = inputMaxLength;
    $scope.studentStatus = studentStatus;
    $scope.contractsTypes = contractsTypes;
    $scope.cfg = pageConfig;

    $scope.getStudents = function()
    {
        StudentService.getStudents()
             .success(function(data)
                      {
                            $scope.alunos = (data && data.students) ? data.students : [];
                      })
    }

    $scope.getClassesNames = function()
    {
        ClazzService.getClazzesNames()
             .success(function(data)
                     {
                         $scope.turmasCadastradas = (data && data.classes) ? data.classes : [];
                     })
    }

    $scope.openModalToDeleteStudent = function(aluno)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-delete-student');
        $scope.alunoEscolhido = aluno;
    }

    $scope.openModalToEditStudent = function(aluno)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-edit-student');
        $scope.alunoEscolhido = aluno;
    }

    $scope.openModalToRegisterStudent = function()
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-register-student');
    }

    $scope.registerNewStudent = function(aluno)
    {
        if (lib.isObjectInvalid(aluno))
            throw new Error('erro: aluno nao informado - registerNewStudent');

        $scope.isLoadingVisible.modal = true;

        aluno.class = aluno.class ? aluno.class.name : '';
        aluno.status = aluno.status ? aluno.status.nome : '';
        aluno.contract = aluno.contract ? aluno.contract.nome : '';
        aluno = lib.removeWhiteSpaces(aluno);

        StudentService.registerStudent(aluno)
             .success(function()
                      {
                          $scope.getStudents();
                          ModalHelper.close('#modal-register-student');
                          lib.emptyProperty($scope, 'novoAluno', {});
                      })
    }

    $scope.editStudent = function(aluno)
    {
        if (lib.isObjectInvalid(aluno) || (lib.isStringInvalid(aluno._id)))
            throw new Error('Não foi possível editar este aluno. Tente mais tarde.');

        $scope.isLoadingVisible.modal = true;

        aluno.class = aluno.class ? aluno.class.name : '';
        aluno.status = aluno.status ? aluno.status.nome : '';
        aluno.contract = aluno.contract ? aluno.contract.nome : '';

        StudentService.editStudent(aluno._id, aluno)
             .success(function()
                      {
                            $scope.getStudents();
                            ModalHelper.close('#modal-edit-student');
                            lib.emptyProperty($scope, 'alunoEscolhido', {});
                      })
    }

    $scope.deleteStudent = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não foi possível realizar a deleção do aluno. O ID está errado.');

        $scope.isLoadingVisible.modal = true;

        StudentService.deleteStudent(id)
             .success(function()
                    {
                        $scope.getStudents();
                        ModalHelper.close('#modal-delete-student');
                        lib.emptyProperty($scope, 'alunoEscolhido', {});
                    })
    }

    $scope.getStudents();
    $scope.getClassesNames();
}])