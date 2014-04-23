"use strict";

myClass.controller('ClazzDayController', ['$scope', '$http', 'lib', 'pageConfig', 'ClazzDayService', 'TeacherService', 'StudentService', 'ClazzService',
                                function ($scope, $http, lib, pageConfig, ClazzDayService, TeacherService, StudentService, ClazzService)
{
    $scope.cfg = pageConfig;
    $scope.aulaEscolhida = {};
    $scope.alunos = [];
    $scope.professores = [];
    $scope.isLoadingVisible = {modal: false};
    $scope.hoje = moment().format('DD/MM/YYYY');
    $scope.clazzesNames = [];
    $scope.informacaoDiaria = [];
    var currentMonthYear = moment().format("MM/YYYY");

    $scope.getClazzesNames = function()
    {
        ClazzService.getClazzesNames()
            .success(function(data)
            {
                $scope.clazzesNames = (data && data.classes) ? data.classes : [];
            })
    }

    $scope.getClassesDailyInfo = function(monthYear)
    {
        var invalidString = lib.isStringInvalid(monthYear) || monthYear.length !== 7;
        var notNumber = lib.isStringInvalid(monthYear) || ("number" !== typeof parseInt(monthYear.substring(0, 2))) || ("number" !== typeof parseInt(monthYear.substring(3, 7)));
        var wrongSeparator = lib.isStringInvalid(monthYear) || (monthYear.indexOf('/') === -1);

        if (invalidString || notNumber || wrongSeparator)
            throw new Error('Não foi informado o ano e mês correto para consulta.');

        monthYear = monthYear.replace('/', '_');

        //TODO PASS CLASS PARAM SO IT'LL UPDATE ONLY THE CLASS, NOT THE WHOLE THING

        ClazzDayService.getDailyInfo(monthYear)
            .success(function(data)
            {
                $scope.informacaoDiaria = (data && data.info) ? data.info : [];
            })
    }

    $scope.getStudentsNamesByClass = function(turma)
    {
        if (lib.isStringInvalid(turma))
            throw new Error('Não foi possível pegar os nomes dos alunos.');

        StudentService.getStudentsNamesInClass(turma)
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
        TeacherService.getTeachersNames()
             .success(function(data)
                     {
                          $scope.professores = (data && data.resultado) ? data.resultado : [];
                     })
    }

    $scope.getClazzesNames();
    $scope.getClassesDailyInfo(currentMonthYear);
    $scope.getTeachersNames();

    $scope.registerClazzDay = function(turma, alunos)
    {
        var problemasAlunos = (lib.isObjectInvalid(alunos));
        var problemasTurma = ((lib.isObjectInvalid(turma)) || (!turma.teacherName) || (!turma.subject));

        if (problemasAlunos || problemasTurma)
            throw new Error('Não será possível continuar, pois alguns parâmetros não foram informados.');

        var _moment = {};

        _moment.clazzName = turma.name;
        _moment.dailyInfo = {
                                day: moment().format("DD"),
                                monthYear: currentMonthYear.replace('/', '_'),
                                teacherName: turma.teacherName,
                                subject: turma.subject,
                                studentByDay: alunos
                            };

        $scope.isLoadingVisible.modal = true;

        ClazzDayService.registerDailyInfo(_moment)
             .success(function()
                     {
                         closesModal('#modal-clazz-day');
                         emptyProperty('turmaDiaDia');
                         $scope.getClassesDailyInfo(currentMonthYear);
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

    function closesModal(modalID)
    {
        escondeModal(modalID);
        $scope.getClassesDailyInfo(currentMonthYear);
    }

    function emptyProperty(propertyToBeEmpty)
    {
        $scope[propertyToBeEmpty] = {};
    }

    $scope.isHistoricoVisible = function(historico)
    {
        var periodoEscolhido = (historico) && ("number" === typeof historico) ? historico : 0;
        return periodoEscolhido > 0 ? true : false;
    }
}])