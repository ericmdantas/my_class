"use strict";

myClass.controller('ClassesController', ['$scope', '$timeout', 'lib', 'pageConfig', 'inputMaxLength', 'ClazzService', 'StudentService', 'ModalHelper',
                                function ($scope, $timeout, lib, pageConfig, inputMaxLength, ClazzService, StudentService, ModalHelper)
{
    $scope.turmas = [];
    $scope.cfg = pageConfig;
    $scope.novaTurma = {};
    $scope.inputMaxLength = inputMaxLength;
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
        StudentService.getStudentsNames()
            .success(function(data)
            {
                $scope.alunos = (data && data.students) ? data.students : [];

                for (var i = 0; i < $scope.alunos.length; i++)
                {
                    $scope.alunos[i] = $scope.alunos[i].name;
                }
            })
            .finally(function()
            {
                $('#alunos-nova-turma').select2();
            })
    }

    $scope.openModalToEditClass = function(myClass)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-edit-class');

        $scope.turmaEscolhida = myClass;

        $timeout(function()
        {
            $('#alunos-turma-editada').select2().trigger('change');
        }, 0);
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

        if (lib.isObjectInvalid(turma.students))
            throw new Error('Não foi possível registrar esta turma, objeto de alunos não informado corretamente.');

        $scope.isLoadingVisible.modal = true;

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

        if (lib.isObjectInvalid(turma.students))
            throw new Error('Não foi possível editar esta turma, objeto de alunos não informado corretamente.');

        $scope.isLoadingVisible.modal = true;

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