"use strict";

myClass.controller('ClassesController', ['$scope', '$http', 'pageConfig', 'ClazzService', function ($scope, $http, pageConfig, ClazzService)
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
        $http.get('/api/students/name')
            .success(function(data)
            {
                $scope.alunos = (data && data.students) ? data.students : [];
            })
    }

    $scope.getClasses();
    $scope.getStudentsNames();

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

    $scope.openModalToEditClass = function(myClass)
    {
        preparaAberturaModal('#modal-edit-class');
        $scope.turmaEscolhida = myClass;
    }

    $scope.openModalToDeleteClass = function(myClass)
    {
        preparaAberturaModal('#modal-delete-class');
        $scope.turmaEscolhida = myClass;
    }

    $scope.openModalToRegisterClass = function()
    {
        preparaAberturaModal('#modal-register-class');
    }

    $scope.registerClass = function(turma)
    {
        $scope.isLoadingVisible.modal = true;

        if ((!turma) || ("object" !== typeof turma) || (!Object.keys(turma).length))
            throw new Error('Não foi possível registrar esta turma.');

        ClazzService.registerClazz(turma)
            .success(function()
            {
                closesModal('#modal-register-class');
                emptyProperty('novaTurma');
            })
    }

    $scope.editClass = function(turma)
    {
        $scope.isLoadingVisible.modal = true;

        if ((!turma) || ("object" !== typeof turma) || (!Object.keys(turma).length) || (!turma._id))
            throw new Error('Não foi possível editar esta turma.');

        ClazzService.editClazz(turma._id, turma)
             .success(function()
                     {
                         closesModal('#modal-edit-class');
                         emptyProperty('turmaEscolhida');
                     })
    }

    $scope.deleteClass = function(id)
    {
        if (("string" !== typeof id) || (!id))
            throw new Error('Não foi possível deletar esta turma, pois o id está errado.');

        $scope.isLoadingVisible.modal = true;

        ClazzService.deleteClazz(id)
            .success(function()
                    {
                        closesModal('#modal-delete-class');
                        emptyProperty('turmaEscolhida');
                    })
    }

    function closesModal(modalID)
    {
        escondeModal(modalID);
        $scope.getClasses();
    }

    function emptyProperty(propertyToBeEmpty)
    {
        $scope[propertyToBeEmpty] = {};
    }
}])