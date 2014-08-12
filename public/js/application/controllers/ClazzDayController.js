"use strict";

myClass.controller('ClazzDayController', ['$scope', 'lib', 'pageConfig', 'inputMaxLength', 'ClazzDayResource', 'TeacherResource', 'StudentResource', 'ClazzResource', 'ModalHelper',
                                function ($scope, lib, pageConfig, inputMaxLength, ClazzDayResource, TeacherResource, StudentResource, ClazzResource, ModalHelper)
{
    $scope.cfg = pageConfig;
    $scope.aulaEscolhida = {};
    $scope.alunos = [];
    $scope.inputMaxLength = inputMaxLength;
    $scope.professores = [];
    $scope.isLoadingVisible = {modal: false};
    $scope.hoje = moment().format('DD/MM/YYYY');
    $scope.clazzesNames = [];
    $scope.informacaoDiaria = [];
    var currentMonthYear = moment().format("MM/YYYY");

    $scope.openModalToRegisterClazzDay = function()
    {
        $scope.isLoadingVisible.modal = false;
        ModalHelper.open('#modal-clazz-day');
    }

    var _getClazzesNames = function()
    {
        var _onSuccess = function(data)
        {
            $scope.clazzesNames = data || [];
        }

        ClazzResource
            .query({property: 'name'}, _onSuccess);
    }

    $scope.getClassesDailyInfo = function(monthYear, id)
    {
        var invalidString = lib.isStringInvalid(monthYear) || monthYear.length !== 7;
        var notNumber = lib.isStringInvalid(monthYear) || ("number" !== typeof parseInt(monthYear.substring(0, 2))) || ("number" !== typeof parseInt(monthYear.substring(3, 7)));
        var wrongSeparator = lib.isStringInvalid(monthYear) || (monthYear.indexOf('/') === -1);

        if (invalidString || notNumber || wrongSeparator)
            throw new Error('Não foi informado o ano e mês correto para consulta.');

        monthYear = monthYear.replace('/', '_');

        lib.isStringInvalid(id) ? _getDailyInfoFromAllClazzes(monthYear)
                                : _getDailyInfoByClass(monthYear, id);
    }

    $scope.getStudentsNamesByClass = function(turma)
    {
        if (lib.isStringInvalid(turma))
            throw new Error('Não foi possível pegar os nomes dos alunos.');

        var _onSuccess = function(data)
        {
            $scope.alunos = data || [];

            for (var i = 0; i < $scope.alunos.length; i++)
            {
                $scope.alunos[i].wasInClass = true;
            }
        }

        StudentResource
            .getNames({clazz: turma}, _onSuccess);
    }

    var _getTeachersNames = function()
    {
        var _onSuccess = function(data)
        {
            $scope.professores = data || [];
        };

        TeacherResource
            .query({property: 'name'}, _onSuccess);
    }

    $scope.registerClazzDay = function(turma, alunos)
    {
        var _problemasAlunos = (lib.isObjectInvalid(alunos));
        var _problemasTurma = ((lib.isObjectInvalid(turma)) || (!turma.teacherName) || (!turma.teacherName.name) || (!turma.subject));

        if (_problemasAlunos || _problemasTurma)
            throw new Error('Não será possível continuar, pois alguns parâmetros não foram informados.');

        var _onSuccess = function()
        {
            $scope.getClassesDailyInfo(currentMonthYear);
            ModalHelper.close('#modal-clazz-day');
            lib.emptyProperty($scope, 'turmaDiaDia', {});
        };

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

        ClazzDayResource
            .save(_moment, _onSuccess);
    }

    var _getDailyInfoFromAllClazzes = function(monthYear)
    {
        var _onSuccess = function(data)
        {
            $scope.informacaoDiaria = data || [];
        };

        ClazzDayResource
            .query({monthAndYear: monthYear}, _onSuccess)
    }

    var _getDailyInfoByClass = function(monthYear, id)
    {
        var _onSuccess = function(data)
        {
            var _informacaoDiaria;

            if (data)
            {
                _informacaoDiaria = data;

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
        };

        ClazzDayResource
            .query({monthAndYear: monthYear, id: id}, _onSuccess);
    }

    $scope.isHistoricoVisible = function(historico)
    {
        var periodoEscolhido = (historico) && ("number" === typeof historico) ? historico : 0;
        return periodoEscolhido > 0 ? true : false;
    }

    _getClazzesNames();
    _getTeachersNames();
    $scope.getClassesDailyInfo(currentMonthYear);
}])