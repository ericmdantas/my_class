"use strict";

myClass.controller('ClassesController', ['$scope', '$http', 'pageConfig', function ($scope, $http, pageConfig)
{
    $scope.turmas = [];
    $scope.cfg = pageConfig;
    $scope.novaTurma = {};
    $scope.turmaEscolhida = {};
    $scope.isLoadingVisible = {modal: false};

    $scope.getClasses = function()
    {
        $http.get('/api/getClasses?u=eric3')
             .success(function(data)
                      {
                          $scope.turmas = data.classes;
                      })
    }

    $scope.getClasses();

    $scope.openModalToEditClass = function(myClass, i)
    {
        $scope.isLoadingVisible.modal = false;
        $('#modal-edit-class').modal({keyboard: true});
        $scope.turmaEscolhida = myClass;
        $scope.turmaEscolhida.index = i;
    }

    $scope.openModalToDeleteClass = function(myClass, i)
    {
        $scope.isLoadingVisible.modal = false;
        $('#modal-delete-class').modal({keyboard: true});
        $scope.turmaEscolhida = myClass;
        $scope.turmaEscolhida.index = i;
    }

    $scope.openModalToRegisterClass = function()
    {
        $scope.isLoadingVisible.modal = false;
        $('#modal-register-class').modal({keyboard: true});
    }

    $scope.registerClass = function(turma)
    {
        $scope.isLoadingVisible.modal = true;

        $http.post('/api/registerClass?u=eric3', turma)
            .success(function()
            {
                $scope.isLoadingVisible.modal = false;
                $('#modal-register-class').modal('hide');
                $scope.getClasses();
                $scope.novaTurma = {};
            })
    }

    $scope.editClass = function(turma)
    {
        $scope.isLoadingVisible.modal = true;

        $http.post('/api/editClass?u=eric3', turma)
             .success(function()
                      {
                          $scope.getClasses();
                          $('#modal-edit-class').modal('hide');
                          $scope.isLoadingVisible.modal = false;
                      })
    }

    $scope.deleteClass = function(id)
    {
        if ((!id) || ("object" === typeof id))
            throw new Error('Não foi possível deletar esta turma, pois o id está errado.');

        $scope.isLoadingVisible.modal = true;

        $http.delete('/api/deleteClass?u=eric3&c='+id)
            .success(function()
            {
                $scope.getClasses();
                $('modal-delete-class').modal('hide');
                $scope.isLoadingVisible.modal = false;
            })
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