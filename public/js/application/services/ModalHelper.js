"use strict";

myClass.factory('ModalHelper', ['lib', function(lib)
{
    function _manageModal(id, action)
    {
        if (lib.isStringInvalid(id) || ("#" !== id.substring(0, 1)))
            throw new Error('Não será possível fechar o modal. ID informado de forma incorreta');

        if (lib.isStringInvalid(action))
            throw new Error('Não será possível gerenciar o modal. A ação informada está incorreta');

        $(id).modal(action);
    }

    function _closeModal(modalID)
    {
        if (lib.isStringInvalid(modalID) || ("#" !== modalID.substring(0, 1)))
            throw new Error('Não será possível fechar o modal. ID informado de forma incorreta');

        _manageModal(modalID, 'hide');
    }

    function _openModal(modalID)
    {
        if (lib.isStringInvalid(modalID) || ("#" !== modalID.substring(0, 1)))
            throw new Error('Não será possível fechar o modal. ID informado de forma incorreta');

        _manageModal(modalID, 'show');
    }

    return {
                close: _closeModal,
                open: _openModal
           }
}])