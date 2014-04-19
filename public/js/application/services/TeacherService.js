"use strict";

myClass.factory('TeacherService', ['$http', 'lib', function($http, lib)
{
    var URL = '/api/teachers';

    function _getTeachers()
    {
        return $http.get(URL);
    }

    function _getTeachersNames()
    {
        return $http.get(URL + '/name');
    }

    function _registerTeacher(professor)
    {
        if (lib.isObjectInvalid(professor))
            throw new Error('Não é possível cadastrar o professor. Parâmetro PROFESSOR errado.');

        return $http.post(URL, professor);
    }

    function _editTeacher(id, professor)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não é possível editar o professor. Parâmetro ID errado.');

        if (lib.isObjectInvalid(professor))
            throw new Error('Não é possível editar o professor. Parâmetro PROFESSOR errado.');

        return $http.put(URL + '/' + id, professor);
    }

    function _deleteTeacher(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não é possível deletar o professor. Parâmetro ID errado.');

        return $http.delete(URL + '/' + id);
    }

    return {
                getTeachers: _getTeachers,
                getTeachersNames: _getTeachersNames,
                registerTeacher: _registerTeacher,
                editTeacher: _editTeacher,
                deleteTeacher: _deleteTeacher
           }
}])