"use strict";

myClass.factory('lib', function()
{
    function _removeWhiteSpaces(obj)
    {
        if ((!obj) || ("object" !== typeof obj) || (!Object.keys(obj).length))
            throw new Error('problema na remoção de espaços em branco (obj == undefined)');

        for (var i in obj)
        {
            if ("string" === typeof obj[i])
                obj[i] = obj[i].trim();
        }

        return obj;
    }

    function _createAlert(status, mensagem)
    {
        if ($('.alert').length)
            return;

        var problemaStatus = status || 'desconhecido';
        var problemaMensagem = mensagem || 'Aconteceu algo inesperado. Por favor, tente novamente mais tarde ';
        var mensagemCompleta = problemaMensagem + ' ('+problemaStatus+').';


        $('#warning').append('<div class="alert alert-danger fade in created centered">'+
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
            '<strong>Oops!</strong> '+mensagemCompleta+
            '</div>');

        $('.alert').alert();
    }

    function _isStringInvalid(text)
    {
        return ((!text) || ("string" !== typeof text) || (text.length === 0));
    }

    function _isObjectInvalid(obj)
    {
        return ((!obj) || ("object" !== typeof obj) || (!Object.keys(obj).length));
    }

    return {
               removeWhiteSpaces: _removeWhiteSpaces,
               createAlert: _createAlert,
               isStringInvalid: _isStringInvalid,
               isObjectInvalid: _isObjectInvalid
           }
})