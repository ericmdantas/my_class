"use strict";

myClass.factory('StudentService', ['$http', 'lib', function($http, lib)
{
    var URL = '/api/students';

    function _getStudents()
    {
        return $http.get(URL);
    }

    function _getStudentsNames()
    {
        return $http.get(URL + '/name');
    }

    function _getStudentsNamesInClass(turma)
    {
        if (lib.isStringInvalid(turma))
            throw new Error('Não é possível buscar os nomes dos alunos. Nome da turma não foi informado corretamente.');

        return $http.get(URL + '/name/' + turma);
    }

    function _registerStudent(aluno)
    {
        if (lib.isObjectInvalid(aluno))
            throw new Error('Não é possível cadastrar o aluno. O aluno informado não é válido.');

        return $http.post(URL, aluno);
    }

    function _editStudent(id, aluno)
    {
        if (lib.isObjectInvalid(aluno))
            throw new Error('Não é possível editar o aluno. O aluno informado não é válido.');

        if (lib.isStringInvalid(id))
            throw new Error('Não é possível editar o aluno. O id do aluno informado não é válido.');

        return $http.put(URL + '/' + id, aluno);
    }

    function _deleteStudent(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não é possível deletar o aluno. O id do aluno informado não é válido.');

        return $http.delete(URL + '/' + id);
    }

    return {
        getStudents: _getStudents,
        getStudentsNames: _getStudentsNames,
        getStudentsNamesInClass: _getStudentsNamesInClass,
        registerStudent: _registerStudent,
        editStudent: _editStudent,
        deleteStudent: _deleteStudent
    }
}])