"use strict";

myClass.factory('ModalHelper', ['lib', function(lib)
{
    function _closeModal(modalID)
    {
        if (lib.isStringInvalid(modalID) || ("#" !== modalID.substring(0, 1)))
            throw new Error('Não será possível fechar o modal. ID informado de forma incorreta');

        $(modalID).modal('hide');
    }

    function _openModal(modalID)
    {
        if (lib.isStringInvalid(modalID) || ("#" !== modalID.substring(0, 1)))
            throw new Error('Não será possível fechar o modal. ID informado de forma incorreta');

        $(modalID).modal('show');
    }

    return {
                close: _closeModal,
                open: _openModal
           }
}])