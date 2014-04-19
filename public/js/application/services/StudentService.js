"use strict";

myClass.factory('StudentService', ['$http', function($http)
{
    var URL = '/api/students';

    function _getStudents()
    {
        return $http.get(URL);
    }

    function _getStudentsNamesInClass(turma)
    {
        return $http.get(URL + '/name/' + turma);
    }

    function _registerStudent(aluno)
    {
        return $http.post(URL, aluno);
    }

    function _editStudent(id, aluno)
    {
        return $http.put(URL + '/' + id, aluno);
    }

    function _deleteStudent(id)
    {
        return $http.delete(URL + '/' + id);
    }

    return {
        getStudents: _getStudents,
        getStudentsNamesInClass: _getStudentsNamesInClass,
        registerStudent: _registerStudent,
        editStudent: _editStudent,
        deleteStudent: _deleteStudent
    }
}])