"use strict";

myClass.factory('ClazzService', ['$http', function($http)
{
    var URL = '/api/classes';

    function _getClazzes()
    {
        return $http.get(URL);
    }

    function _getClazzesNames()
    {
        return $http.get(URL + '/name');
    }

    function _registerClazz(turma)
    {
        return $http.post(URL, turma);
    }

    function _editClazz(id, turma)
    {
        return $http.put(URL + '/' + id, turma);
    }

    function _deleteClazz(id)
    {
        return $http.delete(URL + '/' + id);
    }

    return {
                getClazzes: _getClazzes,
                getClazzesNames: _getClazzesNames,
                registerClazz: _registerClazz,
                editClazz: _editClazz,
                deleteClazz: _deleteClazz
           }
}])