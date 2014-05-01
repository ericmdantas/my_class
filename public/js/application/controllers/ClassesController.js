"use strict";

myClass.controller('ClassesController', ['$scope', '$http', 'lib', 'pageConfig', 'ClazzService', 'StudentService', 'ModalHelper',
                                function ($scope, $http, lib, pageConfig, ClazzService, StudentService, ModalHelper)
{
    $scope.turmas = [];
    $scope.cfg = pageConfig;
    $scope.novaTurma = {};
    $scope.turmaEscolhida = {};
    $scope.alunos = {};
    $scope.professores = {};
    $scope.isLoadingVisible = {modal: false};

    $scope.getClasses = function()
    {
        ClazzService.getClazzes()
             .success(function(data)
                      {
                          $scope.turmas = (data && data.classes) ? data.classes : [];
                      })
    }

    $scope.getStudentsNames = function()
    {
        //TODO: CHECK SOME WAY TO ALLOW USER TO SELECT MORE THAN ONE STUDENT - SELECT2
        //SO THAT THE FOLLOWING REQUEST IS USED CORRECTLY

        StudentService.getStudentsNames()
            .success(function(data)
            {
                $scope.alunos = (data && data.students) ? data.students : [];
            })
    }

    $scope.openModalToEditClass = function(myClass)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-edit-class');
        $scope.turmaEscolhida = myClass;
    }

    $scope.openModalToDeleteClass = function(myClass)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-delete-class');
        $scope.turmaEscolhida = myClass;
    }

    $scope.openModalToRegisterClass = function()
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-register-class');
    }

    $scope.registerClass = function(turma)
    {
        if (lib.isObjectInvalid(turma))
            throw new Error('Não foi possível registrar esta turma.');

        $scope.isLoadingVisible.modal = true;

        if (turma && turma.students && turma.students.indexOf(',') > -1)
            turma.students = turma.students.split(',');

        ClazzService.registerClazz(turma)
            .success(function()
            {
                $scope.getClasses();
                ModalHelper.close('#modal-register-class');
                lib.emptyProperty($scope, 'novaTurma', {});
            })
    }

    $scope.editClass = function(turma)
    {
        if (lib.isObjectInvalid(turma) || lib.isStringInvalid(turma._id))
            throw new Error('Não foi possível editar esta turma.');

        $scope.isLoadingVisible.modal = true;

        if (turma && turma.students && turma.students.indexOf(',') > -1)
            turma.students = turma.students.split(',');

        ClazzService.editClazz(turma._id, turma)
             .success(function()
                     {
                         $scope.getClasses();
                         ModalHelper.close('#modal-edit-class');
                         lib.emptyProperty($scope, 'turmaEscolhida', {});
                     })
    }

    $scope.deleteClass = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não foi possível deletar esta turma, pois o id está errado.');

        $scope.isLoadingVisible.modal = true;

        ClazzService.deleteClazz(id)
            .success(function()
                    {
                        $scope.getClasses();
                        ModalHelper.close('#modal-delete-class');
                        lib.emptyProperty($scope, 'turmaEscolhida', {});
                    })
    }

    $scope.getClasses();
    $scope.getStudentsNames();
}])