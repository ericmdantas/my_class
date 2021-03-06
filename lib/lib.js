"use strict";

//lib_backend

(function()
{
    function _getValuesByTrimester(doc)
    {
        if (!doc)
            return;

        var valoresPorTrimestre = {valorPrimeiroTrimestre: 0, valorSegundoTrimestre: 0, valorTerceiroTrimestre: 0, valorQuartoTrimestre: 0 };

        var calculaValoresSeparadosPorTrimestre = function(mes, valor)
        {
            switch (mes)
            {
                case "janeiro":
                case "fevereiro":
                case "março": valoresPorTrimestre.valorPrimeiroTrimestre += valor;
                              break;

                case "abril":
                case "maio":
                case "junho": valoresPorTrimestre.valorSegundoTrimestre += valor;
                              break;

                case "julho":
                case "agosto":
                case "setembro": valoresPorTrimestre.valorTerceiroTrimestre += valor;
                                 break;

                case "outubro":
                case "novembro":
                case "dezembro": valoresPorTrimestre.valorQuartoTrimestre += valor;
                                 break;
            }
        }

        for (var i = 0; i < doc.length; i++)
        {
            calculaValoresSeparadosPorTrimestre(doc[i].mes.toLowerCase(), parseInt(doc[i].valor))
        }

        return valoresPorTrimestre;
    }

    function _getMonthInDate(doc)
    {
        var totalAlunos = 0;

        if ((!doc) || ("object" !== typeof doc) || (Object.keys(doc).length === 0) || (doc.length === 0))
            return;

        var meses = [{nome: 'Janeiro', contador: 0}, {nome: 'Fevereiro', contador: 0}, {nome: 'Março', contador: 0},
                     {nome: 'Abril', contador: 0}, {nome: 'Maio', contador: 0}, {nome: 'Junho', contador: 0},
                     {nome: 'Julho', contador: 0}, {nome: 'Agosto', contador: 0}, {nome: 'Setembro', contador: 0},
                     {nome: 'Outubro', contador: 0}, {nome: 'Novembro', contador: 0}, {nome: 'Dezembro', contador: 0}];

        for (var i = 0; i < doc.length; i++)
        {
            if (doc[i].registered)
            {
                var idMes = doc[i].registered.getUTCMonth();
                meses[idMes].contador += 1;
            }
        }

        for (var j = 0; j < meses.length; j++)
        {
            totalAlunos += meses[j].contador;
        }

        for (var h = 0; h < meses.length; h++)
        {
            meses[h].porcentagem = parseFloat(_getPercentage(totalAlunos, meses[h].contador).toFixed(2));
        }

        return meses;
    }

    function _getPercentage(total, parcial)
    {
        var eNumero = ("number"  === typeof total) && ("number" === typeof parcial);

        if (!eNumero)
            throw new Error('Não é possível retornar porcentagem de parâmetros não numéricos.');

        var maiorQueZero = (total > 0) && (parcial >= 0);

        return eNumero && maiorQueZero ? ((parcial * 100) / total) : 0;
    }

    exports.getValuesByTrimester = _getValuesByTrimester;

    function _isStringInvalid(str)
    {
        return (!str) || ("string" !== typeof str) || (str.length === 0) || (str.trim().length === 0);
    }

    function _isObjectInvalid(obj)
    {
        return (!obj) || ("object" !== typeof obj) || (!Object.keys(obj).length);
    }

    function _isFunctionInvalid(fn)
    {
        return (!fn) || ("function" !== typeof fn);
    }

    function _isNumberInvalid(nm)
    {
        if (nm === 0)
            return false;

        return ("number" !== typeof nm) || (!nm);
    }

    exports.getMonthInDate = _getMonthInDate;
    exports.getPercentage = _getPercentage;
    exports.isStringInvalid = _isStringInvalid;
    exports.isObjectInvalid = _isObjectInvalid;
    exports.isFunctionInvalid = _isFunctionInvalid;
    exports.isNumberInvalid = _isNumberInvalid;

}())