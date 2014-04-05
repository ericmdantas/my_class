"use strict";

myClass.controller('ClazzDayController', ['$scope', '$http', 'pageConfig', function ($scope, $http, pageConfig)
{
    $scope.turmas = [];
    $scope.cfg = pageConfig;
    $scope.aulaEscolhida = {};
    $scope.alunos = {};
    $scope.professores = {};
    $scope.isLoadingVisible = {modal: false};
    $scope.hoje = moment().format('DD/MM/YYYY');
    $scope.monthYear = moment().format('MM/YYYY');
    $scope.turmasCadastradas = {};

    $scope.getClasses = function()
    {
        $http.get('/api/classes')
            .success(function(data)
            {
                $scope.turmasCadastradas = (data && data.classes) ? data.classes : [];
            })
    }

    $scope.registerClassMomentInTime = function(turma, alunos)
    {
        if (!turma  || !alunos || !turma.teacher || !turma.date || !turma.subject)
            throw new Error('Não será possível continuar, pois alguns parâmetros não foram informados.');

        var moment = {};

        moment.teacher = turma.teacher;
        moment.date = turma.date;
        moment.subject = turma.subject;
        moment.observation = turma.observation;
        moment.studentsInTheClass = alunos;

        $scope.isLoadingVisible.modal = true;

        $http.post('/api/classes/moment', moment)
            .success(function()
            {
                closesModal('#modal-clazz-day');
                emptyProperty('turmaDiaDia');
                $scope.getClasses();
            })
    }

    $scope.getStudentsNamesByClass = function(turma)
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
        if (!turma  || !alunos || !turma.teacher || !turma.date || !turma.subject)
            throw new Error('Não será possível continuar, pois alguns parâmetros não foram informados.');

        var moment = {};

        moment.teacher = turma.teacher;
        moment.date = turma.date;
        moment.subject = turma.subject;
        moment.observation = turma.observation;
        moment.studentsInTheClass = alunos;

        $scope.isLoadingVisible.modal = true;

        $http.post('/api/classes/moment', moment)
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
        var periodoEscolhido = (historico) && ("number" === typeof historico)? historico : 0;
        return periodoEscolhido > 0 ? true : false;
    }
}])