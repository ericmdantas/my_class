var lib_backend = require('../../../lib/lib'),
    assert = require('assert');

describe('checks if lib\'s doing good', function()
{
    describe('checks creation', function()
    {
        it('checks if lib was created', function()
        {
            assert.strictEqual(typeof lib_backend, "object");
            assert.strictEqual(typeof lib_backend.getValuesByTrimester, "function");
            assert.strictEqual(typeof lib_backend.getMonthInDate, "function");
            assert.strictEqual(typeof lib_backend.getPercentage, "function");
        })
    })

    describe('checks if return trimester is working properly', function()
    {
        it('checks if getValuesByTrimester is working with empty obj', function()
        {
            var resultado = lib_backend.getValuesByTrimester(undefined);
            assert.equal(undefined, resultado);
        })

        it('checks if getValuesByTrimester is working with zero values', function()
        {
            var obj = [{mes: "JANEIRO", valor: 0}, {mes: "Fevereiro", valor: 0}, {mes: "Março", valor: 0},
                       {mes: "Abril", valor: 0}, {mes: "Maio", valor: 0}, {mes: "Junho", valor: 0},
                       {mes: "Julho", valor: 0}, {mes: "Agosto", valor: 0}, {mes: "Setembro", valor: 0},
                       {mes: "Outubro", valor: 0}, {mes: "Novembro", valor: 0}, {mes: "Dezembro", valor: 0}];

            var resultado = lib_backend.getValuesByTrimester(obj);

            assert.strictEqual(0, resultado.valorPrimeiroTrimestre);
            assert.strictEqual(0, resultado.valorSegundoTrimestre);
            assert.strictEqual(0, resultado.valorTerceiroTrimestre);
            assert.strictEqual(0, resultado.valorQuartoTrimestre);
        })

        it('checks if return trimester is returning the first trimester correctly', function()
        {
            var obj = [{mes: "Janeiro", valor: 1}, {mes: "Fevereiro", valor: 1}, {mes: "Março", valor: 11}];
            var resultado = lib_backend.getValuesByTrimester(obj);
            assert.equal(13, resultado.valorPrimeiroTrimestre);
        })

        it('checks if return trimester is returning the second trimester correctly', function()
        {
            var obj = [{mes: "Abril", valor: 1}, {mes: "Maio", valor: 1}, {mes: "Junho", valor: 123123}];
            var resultado = lib_backend.getValuesByTrimester(obj);

            assert.strictEqual(123125, resultado.valorSegundoTrimestre);
        })

        it('checks if return trimester is returning the third trimester correctly', function()
        {
            var obj = [{mes: "Julho", valor: 1}, {mes: "Agosto", valor: 1}, {mes: "Setembro", valor: 123123}];
            var resultado = lib_backend.getValuesByTrimester(obj);

            assert.equal(123125, resultado.valorTerceiroTrimestre);
        })

        it('checks if return trimester is returning the third trimester correctly', function()
        {
            var obj = [{mes: "Outubro", valor: 1}, {mes: "Novembro", valor: 1}, {mes: "Dezembro", valor: 123123}];
            var resultado = lib_backend.getValuesByTrimester(obj);

            assert.strictEqual(123125, resultado.valorQuartoTrimestre);
        })
    })

    describe('checks getMonthInDate', function()
    {
        it('should getMonthInDate even when wrong params are passed - should return undefined', function()
        {
            var _wrongParams = [null, undefined, true, false, function(){}, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                assert.strictEqual(undefined, lib_backend.getMonthInDate(_wrongParams[i]));
            }
        })

        it('checks getMonthInDate when the parameter is correct - January', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var janeiro = porcentagemAlunos[0];
            assert.strictEqual(janeiro.contador, 1);
            assert.strictEqual(janeiro.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - February', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('February, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var fevereiro = porcentagemAlunos[1];
            assert.strictEqual(fevereiro.contador, 1);
            assert.strictEqual(fevereiro.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - March', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('March, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var marco = porcentagemAlunos[2];
            assert.strictEqual(marco.contador, 1);
            assert.strictEqual(marco.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - April', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('April, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var abril = porcentagemAlunos[3];
            assert.strictEqual(abril.contador, 1);
            assert.strictEqual(abril.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - May', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('May, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var maio = porcentagemAlunos[4];
            assert.strictEqual(maio.contador, 1);
            assert.strictEqual(maio.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - June', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('June, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var junho = porcentagemAlunos[5];
            assert.strictEqual(junho.contador, 1);
            assert.strictEqual(junho.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - July', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('July, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var julho = porcentagemAlunos[6];
            assert.strictEqual(julho.contador, 1);
            assert.strictEqual(julho.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - August', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('August, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var agosto = porcentagemAlunos[7];
            assert.strictEqual(agosto.contador, 1);
            assert.strictEqual(agosto.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - September', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('September, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var setembro = porcentagemAlunos[8];
            assert.strictEqual(setembro.contador, 1);
            assert.strictEqual(setembro.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - October', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('October, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var outubro = porcentagemAlunos[9];
            assert.strictEqual(outubro.contador, 1);
            assert.strictEqual(outubro.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - November', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('November, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var novembro = porcentagemAlunos[10];
            assert.strictEqual(novembro.contador, 1);
            assert.strictEqual(novembro.porcentagem, 100);
        })

        it('checks getMonthInDate when the parameter is correct - December', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('December, 20 2014')}];
            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);
            var dezembro = porcentagemAlunos[11];
            assert.strictEqual(dezembro.contador, 1);
            assert.strictEqual(dezembro.porcentagem, 100);
        })

        it('checks if getMonthInDate is working when there are more than 3 months specified', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}, {registered: new Date('May, 20 2014')},
                                              {registered: new Date('June, 20 2014')}, {registered: new Date('December, 20 2014')}];

            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);

            var janeiro = porcentagemAlunos[0];
            var junho = porcentagemAlunos[5];
            var maio = porcentagemAlunos[4];
            var dezembro = porcentagemAlunos[11];

            assert.strictEqual(janeiro.contador, 1);
            assert.strictEqual(janeiro.porcentagem, 25);

            assert.strictEqual(junho.contador, 1);
            assert.strictEqual(junho.porcentagem, 25);

            assert.strictEqual(maio.contador, 1);
            assert.strictEqual(maio.porcentagem, 25);

            assert.strictEqual(dezembro.contador, 1);
            assert.strictEqual(dezembro.porcentagem, 25);
        })

        it('checks if getMonthInDate is working when there are more than one register for some month', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}, {registered: new Date('January, 20 2014')},
                                              {registered: new Date('January, 20 2014')}, {registered: new Date('January, 20 2014')},
                                              {registered: new Date('June, 20 2014')}];

            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);

            var janeiro = porcentagemAlunos[0];
            var junho = porcentagemAlunos[5];

            assert.strictEqual(janeiro.contador, 4);
            assert.strictEqual(janeiro.porcentagem, 80);

            assert.strictEqual(junho.contador, 1);
            assert.strictEqual(junho.porcentagem, 20);
        })

        it('checks if getMonthInDate is working when there are decimal percentage', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}, {registered: new Date('February, 20 2014')},
                                              {registered: new Date('May, 20 2014')}];

            var porcentagemAlunos = lib_backend.getMonthInDate(objetoComInformacaoDeMeses);

            var janeiro = porcentagemAlunos[0];
            var fevereiro = porcentagemAlunos[1];
            var maio = porcentagemAlunos[4];


            assert.strictEqual(janeiro.contador, 1);
            assert.strictEqual(janeiro.porcentagem, 33.33);

            assert.strictEqual(fevereiro.contador, 1);
            assert.strictEqual(fevereiro.porcentagem, 33.33);

            assert.strictEqual(maio.contador, 1);
            assert.strictEqual(maio.porcentagem, 33.33);
        })
    })

    describe('checks getPercentage', function()
    {
        it('checks if getPercentage is working with wrong parameters - should throw an error', function()
        {
            assert.throws(function(){lib_backend.getPercentage('not a number', {a: '1'})}, 'Não é possível retornar porcentagem de parâmetros não numéricos.');
            assert.throws(function(){lib_backend.getPercentage(undefined, null)}, 'Não é possível retornar porcentagem de parâmetros não numéricos.');
            assert.throws(function(){lib_backend.getPercentage([], true)}, 'Não é possível retornar porcentagem de parâmetros não numéricos.');
        })

        it('checks if getPercentage is working with wrong parameters - should return 0', function()
        {
            assert.strictEqual(0, lib_backend.getPercentage(0, 0));
            assert.strictEqual(0, lib_backend.getPercentage(-1, -100));
        })

        it('checks if getPercentage is working with correct parameters', function()
        {
            assert.strictEqual(100, lib_backend.getPercentage(1000, 1000));
            assert.strictEqual(true, (lib_backend.getPercentage(120, 20) >= 16) && (lib_backend.getPercentage(120, 20) <= 17));
        })
    })
})