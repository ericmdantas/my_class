"use strict";

myClass.factory('lib', function()
{
    var _removeWhiteSpaces = function(obj)
    {
        if (_isObjectInvalid(obj))
            throw new Error('problema na remoção de espaços em branco (obj == undefined)');

        for (var i in obj)
        {
            if ("string" === typeof obj[i])
                obj[i] = obj[i].trim();
        }

        return obj;
    }

    var _createAlert = function(status, mensagem)
    {
        if ($('.alert').length)
            return;

        var problemaStatus = status || 'erro desconhecido';
        var problemaMensagem = mensagem || 'Aconteceu algo inesperado. Por favor, tente novamente mais tarde ';
        var mensagemCompleta = problemaMensagem + ' ('+problemaStatus+').';


        $('#warning').append('<div class="alert alert-danger fade in created centered">'+
                                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
                                '<strong>Oops!</strong> '+mensagemCompleta+
                             '</div>');

        $('.alert').alert();
    }

    var _isStringInvalid = function(text)
    {
        return ((!text) || ("string" !== typeof text) || (text.length === 0) || (text.trim().length === 0));
    }

    var _isObjectInvalid = function(obj)
    {
        return ((!obj) || ("object" !== typeof obj) || (!Object.keys(obj).length));
    }

    var _isNumberInvalid = function(num)
    {
        if (num === 0)
            return false;

        return ((!num) || ("number" !== typeof num));
    }

    var _isMonthYearInvalid = function(monthYear)
    {
        var SEPARATOR = "/";

        if (_isStringInvalid(monthYear))
            return true;

        if (monthYear.length !== 7)
            return true;

        if (SEPARATOR !== monthYear.substring(2, 3))
            return true;

        var _mes = parseInt(monthYear.substring(0, 2));
        var _ano = parseInt(monthYear.substring(3, 7));
        var _menorAno = 2000;
        var _maiorAno = new Date().getFullYear();
        var _maiorMes = new Date().getMonth() + 1;

        if (isNaN(_mes) || _mes === 0 || (_mes > _maiorMes && _ano >= _maiorAno))
            return true;

        if (isNaN(_ano) || _ano <  _menorAno || _ano > _maiorAno)
            return true;

        return false;
    }

    var _emptyProperty = function(parent, propertyToBeEmpty, withWhat)
    {
        if (_isObjectInvalid(parent))
            throw new Error('Objeto pai não é um objeto válido para ter sua propriedade limpa.');

        if (_isStringInvalid(propertyToBeEmpty))
            throw new Error('A propriedade em questão não é válida para ser esvaziada.');

        parent[propertyToBeEmpty] = withWhat;
    }

    return {
               removeWhiteSpaces: _removeWhiteSpaces,
               createAlert: _createAlert,
               isStringInvalid: _isStringInvalid,
               isObjectInvalid: _isObjectInvalid,
               isNumberInvalid: _isNumberInvalid,
               isMonthYearInvalid: _isMonthYearInvalid,
               emptyProperty: _emptyProperty
           }
})