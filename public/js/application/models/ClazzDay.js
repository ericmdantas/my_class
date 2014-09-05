"use strict";

myClass.factory('ClazzDay', ['$q', 'lib', 'ClazzDayResource', function($q, lib, ClazzDayResource)
{
    var DEFAULT_OBJECT =
    {
        clazzName: null,
        dailyInfo:
        {
            day: moment().format("DD"),
            monthYear: null,
            teacherName: null,
            subject: null,
            studentByDay: []
        }
    }

    var ClazzDay = function(opt)
    {
        var _opt = opt || DEFAULT_OBJECT;
        angular.extend(this, _opt);
    }

    ClazzDay.prototype =
    {
        isInvalid : function()
        {
            var _semNomeTurma = lib.isStringInvalid(this.clazzName);
            var _semDia = (lib.isObjectInvalid(this.dailyInfo)) || (lib.isStringInvalid(this.dailyInfo.day));
            var _semMesAno = (lib.isObjectInvalid(this.dailyInfo)) || (lib.isStringInvalid(this.dailyInfo.monthYear));
            var _semProfessor = (lib.isObjectInvalid(this.dailyInfo)) || (lib.isStringInvalid(this.dailyInfo.teacherName));
            var _semMateria = (lib.isObjectInvalid(this.dailyInfo)) || (lib.isStringInvalid(this.dailyInfo.subject));
            var _semAlunos = (lib.isObjectInvalid(this.dailyInfo)) || (lib.isObjectInvalid(this.dailyInfo.studentByDay));

            return (_semNomeTurma || _semDia || _semMesAno || _semProfessor || _semMateria || _semAlunos);
        },

        normalizeClazzDay : function(turma, alunos, currentMonthYear)
        {
            var _moment =
            {
                clazzName: turma.name,
                dailyInfo:
                {
                    day: moment().format("DD"),
                    monthYear: currentMonthYear.replace('/', '_'),
                    teacherName: turma.teacherName.name,
                    subject: turma.subject,
                    studentByDay: alunos
                }
            }

            return _moment;
        }
    }

    return ClazzDay;
}])