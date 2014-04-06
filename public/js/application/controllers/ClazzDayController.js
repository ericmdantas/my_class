"use strict";

myClass.controller('ClazzDayController', ['$scope', '$http', 'pageConfig', function ($scope, $http, pageConfig)
{
    $scope.cfg = pageConfig;
    $scope.aulaEscolhida = {};
    $scope.alunos = [];
    $scope.professores = [];
    $scope.isLoadingVisible = {modal: false};
    $scope.hoje = moment().format('DD/MM/YYYY');
    $scope.monthYear = moment().format('MM/YYYY');
    $scope.turmasCadastradas = [];

    $scope.getClasses = function()
    {
        $http.get('/api/classes')
            .success(function(data)
            {
                $scope.turmasCadastradas = (data && data.classes) ? data.classes : [];
            })
    }

    $scope.getStudentsNamesByClass = function(turma)
    {
        if ((!turma) || ("string" !== typeof turma))
            throw new Error('Não foi possível pegar os nomes dos alunos.');

        $http.get('/api/students/name/'+turma)
             .success(function(data)
                     {
                         $scope.alunos = (data && data.students) ? data.students : [];

                         for (var i = 0; i < $scope.alunos.length; i++)
                         {
                             $scope.alunos[i].wasInClass = true;
                         }
                     })
    }

    $scope.getTeachersNames = function()
    {
        $http.get('/api/teachers/name')
             .success(function(data)
                     {
                          $scope.professores = (data && data.resultado) ? data.resultado : [];
                     })
    }

    $scope.getClasses();
    $scope.getTeachersNames();

    $scope.registerClazzDay = function(turma, alunos)
    {
        var problemasAlunos = ((!alunos) || ("object" !== typeof alunos) || (!Object.keys(alunos).length));
        var problemasTurma = (!turma)  || ("object" !== typeof turma) || (!turma.teacher) || (!turma.subject) || (!Object.keys(turma).length);

        if (problemasAlunos || problemasTurma)
            throw new Error('Não será possível continuar, pois alguns parâmetros não foram informados.');

        var _moment = {};

        _moment.clazzName = turma.name;
        _moment.monthYear = moment().format('MM/YYYY');
        _moment.observation = turma.observation;

        for (var i = 0; i < alunos.length; i++)
        {
            alunos[i].date = new Date();
        }

        _moment.dailyInfo = {teacher: turma.teacherName, subject: turma.subject, studentByDay: alunos};

        $scope.isLoadingVisible.modal = true;

        $http.post('/api/classes/moment', _moment)
             .success(function()
                     {
                         closesModal('#modal-clazz-day');
                         emptyProperty('turmaDiaDia');
                         $scope.getClasses();
                     })
    }

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

    $scope.openModalToRegisterClazzDay = function(myClass)
    {
        preparaAberturaModal('#modal-clazz-day');
        $scope.turmaDiaDia = myClass;
    }

    $scope.openModalToEditClazzDay = function(myClass)
    {
        preparaAberturaModal('#modal-edit-clazz-day');
        $scope.aulaEscolhida = myClass;
    }

    $scope.openModalToDeleteClazzDay = function(myClass)
    {
        preparaAberturaModal('#modal-delete-class-day');
        $scope.aulaEscolhida = myClass;
    }

    $scope.registerClass = function(turma)
    {
        $scope.isLoadingVisible.modal = true;

        $http.post('/api/classes', turma)
             .success(function()
                     {
                         closesModal('#modal-clazz-day');
                         emptyProperty('novaTurma');
                     })
    }

    $scope.editClazzDay = function(turma)
    {
        $scope.isLoadingVisible.modal = true;

        $http.put('/api/classes/'+turma._id, turma)
             .success(function()
                     {
                         closesModal('#modal-edit-clazz-day');
                         emptyProperty('turmaEscolhida');
                     })
    }

    $scope.deleteClazzDay = function(id)
    {
        if ((!id) || ("object" === typeof id))
            throw new Error('Não foi possível deletar esta turma, pois o id está errado.');

        $scope.isLoadingVisible.modal = true;

        $http.delete('/api/classes/'+id)
             .success(function()
                     {
                         closesModal('#modal-delete-clazz-day');
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
        if (!tipo || !data)
            return;

        tipo = tipo.toLowerCase();

        $scope.monthYear = moment()[tipo]('months', 1).calendar();
    }

    $scope.isHistoricoVisible = function(historico)
    {
        var periodoEscolhido = (historico) && ("number" === typeof historico) ? historico : 0;
        return periodoEscolhido > 0 ? true : false;
    }
}])