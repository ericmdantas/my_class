"use strict";

myClass.controller('StudentsController', ['$scope', 'pageConfig', 'inputMaxLength', 'studentStatus', 'contractsTypes', 'lib', 'StudentResource', 'ClazzResource', 'ModalHelper',
                                function ($scope, pageConfig, inputMaxLength, studentStatus, contractsTypes, lib, StudentResource, ClazzResource, ModalHelper)
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

    var _getStudents = function()
    {
        var _onSuccess = function(data)
        {
            $scope.alunos = data || [];
        };

        StudentResource
            .query(_onSuccess)
    }

    var _getClassesNames = function()
    {
        var _onSuccess = function(data)
        {
            $scope.turmasCadastradas = data || [];
        }

        ClazzResource
            .query({property: 'name'}, _onSuccess);
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

        var _onSuccess = function()
        {
            _getStudents();
            ModalHelper.close('#modal-register-student');
            lib.emptyProperty($scope, 'novoAluno', {});
        }

        $scope.isLoadingVisible.modal = true;

        aluno.class = aluno.class ? aluno.class.name : '';
        aluno.status = aluno.status ? aluno.status.nome : '';
        aluno.contract = aluno.contract ? aluno.contract.nome : '';
        aluno = lib.removeWhiteSpaces(aluno);

        StudentResource
            .save(aluno, _onSuccess);
    }

    $scope.editStudent = function(aluno)
    {
        if (lib.isObjectInvalid(aluno) || (lib.isStringInvalid(aluno._id)))
            throw new Error('Não foi possível editar este aluno. Tente mais tarde.');

        var _onSuccess = function()
        {
            _getStudents();
            ModalHelper.close('#modal-edit-student');
            lib.emptyProperty($scope, 'alunoEscolhido', {});
        };

        $scope.isLoadingVisible.modal = true;

        aluno.class = aluno.class ? aluno.class.name : '';
        aluno.status = aluno.status ? aluno.status.nome : '';
        aluno.contract = aluno.contract ? aluno.contract.nome : '';

        StudentResource
            .update({id: aluno._id}, aluno, _onSuccess);
    }

    $scope.deleteStudent = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não foi possível realizar a deleção do aluno. O ID está errado.');

        var _onSuccess = function()
        {
            _getStudents();
            ModalHelper.close('#modal-delete-student');
            lib.emptyProperty($scope, 'alunoEscolhido', {});
        };

        $scope.isLoadingVisible.modal = true;

        StudentResource
            .remove({id: id}, _onSuccess)
    }

    _getStudents();
    _getClassesNames();
}])