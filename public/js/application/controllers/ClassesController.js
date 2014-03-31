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
        $http.get('/api/getClasses')
             .success(function(data)
                      {
                          $scope.turmas = data.classes;
                      })
    }

    $scope.getStudentsNames = function(turma)
    {
        $http.get('/api/getStudentsNames/'+turma)
             .success(function(data)
                    {
                        $scope.alunos = (data && data.students) ? data.students : [];
                    })
    }

    $scope.getTeachersNames = function()
    {
        $http.get('/api/getTeachersNames')
            .success(function(data)
            {
                $scope.professores = (data && data.resultado) ? data.resultado : [];
            })
    }

    $scope.getClasses();
    $scope.getTeachersNames();

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

    $scope.openModalToRegisterDayByDay = function(myClass)
    {
        preparaAberturaModal('#modal-day-by-day');
        $scope.turmaEscolhida = myClass;
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

        $http.post('/api/registerClass', turma)
            .success(function()
            {
                closesModal('#modal-register-class');
                emptyProperty('novaTurma');
            })
    }

    $scope.editClass = function(turma)
    {
        $scope.isLoadingVisible.modal = true;

        $http.post('/api/editClass', turma)
             .success(function()
                     {
                         closesModal('#modal-edit-class');
                         emptyProperty('turmaEscolhida');
                     })
    }

    $scope.deleteClass = function(id)
    {
        if ((!id) || ("object" === typeof id))
            throw new Error('Não foi possível deletar esta turma, pois o id está errado.');

        $scope.isLoadingVisible.modal = true;

        $http.delete('/api/deleteClass/'+id)
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

    $scope.changeDate = function(data, tipo)
    {
        return moment()[tipo]('months', 1).calendar();
    }

    $scope.isHistoricoVisible = function(historico)
    {
        var periodoEscolhido = (historico) && ("number" === typeof historico)? historico : 0;
        return periodoEscolhido > 0 ? true : false;
    }
}])