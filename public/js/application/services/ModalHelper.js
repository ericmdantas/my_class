"use strict";

myClass.service('ModalHelper', ['lib', function(lib)
{
    var _closeModal = function (modalID)
    {
        if (lib.isStringInvalid(modalID) || ("#" !== modalID.substring(0, 1)))
            throw new Error('Não será possível fechar o modal. ID informado de forma incorreta');

        $(modalID).modal('hide');
    }

    var _openModal = function (modalID)
    {
        if (lib.isStringInvalid(modalID) || ("#" !== modalID.substring(0, 1)))
            throw new Error('Não será possível fechar o modal. ID informado de forma incorreta');

        $(modalID).modal('show');
    }

    this.close = _closeModal;
    this.open = _openModal;
}])