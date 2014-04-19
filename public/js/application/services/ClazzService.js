"use strict";

myClass.factory('ClazzService', ['$http', 'lib', function($http, lib)
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
        if (lib.isObjectInvalid(turma))
            throw new Error('Não é possível cadastrar a turma. O paramêtro foi passado de forma errada.');

        return $http.post(URL, turma);
    }

    function _editClazz(id, turma)
    {
        if (lib.isObjectInvalid(turma))
            throw new Error('Não é possível editar a turma. O paramêtro TURMA foi passado de forma errada.');

        if (lib.isStringInvalid(id))
            throw new Error('Não é possível editar a turma. O paramêtro ID foi passado de forma errada.');

        return $http.put(URL + '/' + id, turma);
    }

    function _deleteClazz(id)
    {
        if (lib.isStringInvalid(id))
            throw new Error('Não é possível deletar a turma. O paramêtro ID foi passado de forma errada.');

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