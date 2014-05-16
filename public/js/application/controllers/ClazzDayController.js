"use strict";

myClass.controller('ClazzDayController', ['$scope', '$http', 'lib', 'pageConfig', 'ClazzDayService', 'TeacherService', 'StudentService', 'ClazzService', 'ModalHelper',
                                function ($scope, $http, lib, pageConfig, ClazzDayService, TeacherService, StudentService, ClazzService, ModalHelper)
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

    $scope.openModalToRegisterClazzDay = function(myClass)
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-clazz-day');
        $scope.turmaDiaDia = myClass;
    }

    $scope.getClazzesNames = function()
    {
        ClazzService.getClazzesNames()
            .success(function(data)
            {
                $scope.clazzesNames = (data && data.classes) ? data.classes : [];
            })
    }

    $scope.getClassesDailyInfo = function(monthYear, id)
    {
        var invalidString = lib.isStringInvalid(monthYear) || monthYear.length !== 7;
        var notNumber = lib.isStringInvalid(monthYear) || ("number" !== typeof parseInt(monthYear.substring(0, 2))) || ("number" !== typeof parseInt(monthYear.substring(3, 7)));
        var wrongSeparator = lib.isStringInvalid(monthYear) || (monthYear.indexOf('/') === -1);

        if (invalidString || notNumber || wrongSeparator)
            throw new Error('Não foi informado o ano e mês correto para consulta.');

        monthYear = monthYear.replace('/', '_');

        if (lib.isStringInvalid(id))
            _getDailyInfoFromAllClazzes(monthYear);
        else
            _getDailyInfoByClass(monthYear, id);
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

    $scope.registerClazzDay = function(turma, alunos)
    {
        var _problemasAlunos = (lib.isObjectInvalid(alunos));
        var _problemasTurma = ((lib.isObjectInvalid(turma)) || (!turma.teacherName) || (!turma.teacherName.name) || (!turma.subject));

        if (_problemasAlunos || _problemasTurma)
            throw new Error('Não será possível continuar, pois alguns parâmetros não foram informados.');

        var _moment = {};

        _moment.clazzName = turma.name;
        _moment.dailyInfo = {
                                day: moment().format("DD"),
                                monthYear: currentMonthYear.replace('/', '_'),
                                teacherName: turma.teacherName.name,
                                subject: turma.subject,
                                studentByDay: alunos
                            };

        $scope.isLoadingVisible.modal = true;

        ClazzDayService.registerDailyInfo(_moment)
             .success(function()
                     {
                         $scope.getClassesDailyInfo(currentMonthYear);
                         ModalHelper.close('#modal-clazz-day');
                         lib.emptyProperty($scope, 'turmaDiaDia', {});
                     })
    }

    function _getDailyInfoFromAllClazzes(monthYear)
    {
        ClazzDayService.getDailyInfo(monthYear)
            .success(function(data)
            {
                $scope.informacaoDiaria = (data && data.info) ? data.info : [];
            })
    }

    function _getDailyInfoByClass(monthYear, id)
    {
        ClazzDayService.getDailyInfoByClass(monthYear, id)
            .success(function(data)
            {
                var _informacaoDiaria;

                if (data && data.info && (Object.keys(data.info).length))
                {
                    _informacaoDiaria = data.info;

                    for (var i = 0; i < $scope.informacaoDiaria.length; i++)
                    {
                        if (_informacaoDiaria._id === $scope.informacaoDiaria[i]._id)
                        {
                            $scope.informacaoDiaria[i] = _informacaoDiaria;
                            break;
                        }
                    }
                }
                else
                {
                    for (var j = 0; j < $scope.informacaoDiaria.length; j++)
                    {
                        if (id === $scope.informacaoDiaria[j]._id)
                        {
                            $scope.informacaoDiaria[j].dailyInfo = [];
                            break;
                        }
                    }
                }
            })
    }

    $scope.isHistoricoVisible = function(historico)
    {
        var periodoEscolhido = (historico) && ("number" === typeof historico) ? historico : 0;
        return periodoEscolhido > 0 ? true : false;
    }

    $scope.getClazzesNames();
    $scope.getTeachersNames();
    $scope.getClassesDailyInfo(currentMonthYear);
}])