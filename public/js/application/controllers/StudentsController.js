"use strict";

myClass.controller('StudentsController', ['$scope', 'pageConfig', 'inputMaxLength', 'studentStatus', 'contractsTypes', 'lib', 'Student', 'StudentService', 'ClazzService', 'ModalHelper',
                                function ($scope, pageConfig, inputMaxLength, studentStatus, contractsTypes, lib, Student, StudentService, ClazzService, ModalHelper)
{
    $scope.aluno = new Student();
    $scope.alunos = [];
    $scope.turmasCadastradas = [];
    $scope.inputMaxLength = inputMaxLength;
    $scope.studentStatus = studentStatus;
    $scope.contractsTypes = contractsTypes;
    $scope.cfg = pageConfig;

    var _getStudents = function()
    {
        var _onSuccess = function(alunos)
        {
            $scope.alunos = alunos;
        };

        StudentService
            .getAll()
            .then(_onSuccess);
    }

    var _getClassesNames = function()
    {
        var _onSuccess = function(nomes)
        {
            $scope.turmasCadastradas = nomes;
        }

        ClazzService
            .getAllClazzesProp('name')
            .then(_onSuccess);
    }

    $scope.resetStudent = function()
    {
        $scope.aluno = new Student();
    }

    $scope.setStudent = function(aluno)
    {
        $scope.aluno = new Student(aluno);

        $scope.aluno.class = _selectHelper($scope.aluno.class, $scope.turmasCadastradas, 'name');
        $scope.aluno.status = _selectHelper($scope.aluno.status, $scope.studentStatus, 'nome');
        $scope.aluno.contract = _selectHelper($scope.aluno.contract, $scope.contractsTypes, 'nome');
    }

    $scope.registerNewStudent = function(aluno)
    {
        var _onSuccess = function()
        {
            _getStudents();
            ModalHelper.close('#modal-student');
        }

        var _onError = function(error)
        {
            lib.createAlert(null, 'Houve um problema no momento do cadastro do aluno.');
        }

        aluno = $scope.aluno.normalizeStudent(aluno);

        StudentService
            .save(aluno)
            .then(_onSuccess, _onError);
    }

    $scope.editStudent = function(aluno)
    {
        var _onSuccess = function()
        {
            _getStudents();
            ModalHelper.close('#modal-student');
            lib.emptyProperty($scope, 'alunoEscolhido', {});
        }

        var _onError = function(error)
        {
            lib.createAlert(null, 'Houve um problema no momento da edição do aluno.');
        }

        aluno = $scope.aluno.normalizeStudent(aluno);

        StudentService
            .update(aluno)
            .then(_onSuccess, _onError);
    }

    $scope.deleteStudent = function(id)
    {
        var _onSuccess = function()
        {
            _getStudents();
            ModalHelper.close('#modal-delete-student');
            lib.emptyProperty($scope, 'alunoEscolhido', {});
        }

        var _onError = function(error)
        {
            lib.createAlert(null, 'Houve um problema no momento da exclusão do aluno.');
        }

        StudentService
            .remove(id)
            .then(_onSuccess, _onError);
    }

    var _selectHelper = function(comparer, array, prop)
    {
        for (var i = 0; i < array.length; i++)
        {
            if (comparer === array[i][prop])
            {
                return array[i];
            }
        }
    }

    _getStudents();
    _getClassesNames();
}])