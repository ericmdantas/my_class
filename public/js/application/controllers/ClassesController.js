"use strict";

myClass.controller('ClassesController', ['$scope', '$http', 'pageConfig', function ($scope, $http, pageConfig)
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
        $http.get('/api/classes')
             .success(function(data)
                      {
                          $scope.turmas = (data && data.classes) ? data.classes : [];
                      })
    }

    $scope.getStudentsNames = function(turma)
    {
        $http.get('/api/students/name/'+turma)
            .success(function(data)
            {
                if (data && data.students)
                {
                    $scope.alunos = data.students;

                    for (var x in $scope.alunos)
                    {
                        $scope.alunos[x].isInClass = true;
                    }
                }
                else
                    $scope.alunos = [];
            })
    }

    $scope.getClasses();

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

        $http.post('/api/classes', turma)
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

        $http.put('/api/classes/'+turma._id, turma)
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

        $http.delete('/api/classes/'+id)
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