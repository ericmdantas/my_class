"use strict";

myClass.controller('ClassesController', ['$scope', '$timeout', 'lib', 'pageConfig', 'inputMaxLength', 'ClazzResource', 'StudentResource', 'ModalHelper',
                                function ($scope, $timeout, lib, pageConfig, inputMaxLength, ClazzResource, StudentResource, ModalHelper)
{
    $scope.turmas = [];
    $scope.cfg = pageConfig;
    $scope.novaTurma = {};
    $scope.inputMaxLength = inputMaxLength;
    $scope.turmaEscolhida = {};
    $scope.alunos = {};
    $scope.professores = {};
    $scope.isLoadingVisible = {modal: false};

    var _getClasses = function()
    {
        var _onSuccess = function(data)
        {
            $scope.turmas = data || [];
        };

        ClazzResource
            .query(_onSuccess)
    }

    var _getStudentsNames = function()
    {
        var _onSuccess = function(data)
        {
            $scope.alunos = data || [];

            for (var i = 0; i < $scope.alunos.length; i++)
            {
                $scope.alunos[i] = $scope.alunos[i].name;
            }

            $('#alunos-nova-turma').select2();
        };

        StudentResource
            .query({property: 'name'}, _onSuccess);
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

        var _onSuccess = function()
        {
            _getClasses();
            ModalHelper.close('#modal-register-class');
            lib.emptyProperty($scope, 'novaTurma', {});
        };

        $scope.isLoadingVisible.modal = true;

        ClazzResource
            .save(turma, _onSuccess)
    }

    $scope.editClass = function(turma)
    {
        if (lib.isObjectInvalid(turma) || lib.isStringInvalid(turma._id))
            throw new Error('Não foi possível editar esta turma.');

        if (lib.isObjectInvalid(turma.students))
            throw new Error('Não foi possível editar esta turma, objeto de alunos não informado corretamente.');

        var _onSuccess = function()
        {
            _getClasses();
            ModalHelper.close('#modal-edit-class');
            lib.emptyProperty($scope, 'turmaEscolhida', {});
        };

        $scope.isLoadingVisible.modal = true;

        ClazzResource
            .update({id: turma._id}, turma, _onSuccess)
    }

    $scope.deleteClass = function(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não foi possível deletar esta turma, pois o id está errado.');

        var _onSuccess = function()
        {
            _getClasses();
            ModalHelper.close('#modal-delete-class');
            lib.emptyProperty($scope, 'turmaEscolhida', {});
        };

        $scope.isLoadingVisible.modal = true;

        ClazzResource
            .remove({id: id}, _onSuccess);
    }

    _getClasses();
    _getStudentsNames();
}])