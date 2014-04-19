"use strict";

myClass.factory('TeacherService', ['$http', function($http)
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
        return $http.post(URL, professor);
    }

    function _editTeacher(id, professor)
    {
        return $http.put(URL + '/' + id, professor);
    }

    function _deleteTeacher(id)
    {
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