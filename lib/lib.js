"use strict";

//lib_backend

(function()
{
    function retornaValoresPorTrimestre(doc)
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

    function pegaMesNaData(doc)
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
            meses[h].porcentagem = parseFloat(retornaPorcentagem(totalAlunos, meses[h].contador).toFixed(2));
        }

        return meses;
    }

    function retornaPorcentagem(total, parcial)
    {
        var eNumero = ("number"  === typeof total) && ("number" === typeof parcial);

        if (!eNumero)
            throw new Error('Não é possível retornar porcentagem de parâmetros não numéricos.');

        var maiorQueZero = (total > 0) && (parcial >= 0);

        return eNumero && maiorQueZero ? ((parcial * 100) / total) : 0;
    }

    exports.getValuesByTrimester = retornaValoresPorTrimestre;
    exports.getMonthInDate = pegaMesNaData;
    exports.getPercentage = retornaPorcentagem;
}())