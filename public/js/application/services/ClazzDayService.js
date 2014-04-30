"use strict";

myClass.factory('ClazzDayService', ['$http', 'lib', function($http, lib)
{
    var URL = '/api/classes/dailyInfo';

    function _getDailyInfo(monthAndYear)
    {
        if (lib.isStringInvalid(monthAndYear))
            throw new Error('Não é possível buscar as informações de aula. Parâmetro MÊS/ANO passado errado.');

        return $http.get(URL + '/' + monthAndYear);
    }

    function _getDailyInfoByClass(monthAndYear, id)
    {
        if (lib.isStringInvalid(monthAndYear))
            throw new Error('Não é possível buscar as informações de aula para esta turma. Parâmetro MÊS/ANO passado errado.');

        if (lib.isStringInvalid(id))
            throw new Error('Não é possível buscar as informações de aula para esta turma. Parâmetro ID passado errado.');

        return $http.get(URL + '/' + id + '/' + monthAndYear);
    }

    function _registerDailyInfo(moment)
    {
        if (lib.isObjectInvalid(moment))
            throw new Error('Não é possível registrar aula. Parâmetro MOMENTO passado errado.');

        return $http.post(URL, moment);
    }

    return {
                getDailyInfo: _getDailyInfo,
                getDailyInfoByClass: _getDailyInfoByClass,
                registerDailyInfo: _registerDailyInfo
           }
}])