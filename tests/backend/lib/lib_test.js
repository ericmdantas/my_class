"use strict";

var expect = require('chai').expect;
var lib = require('../../../lib/lib');

describe('lib', function()
{
    describe('getValuesByTrimester', function()
    {
        it('checks if getValuesByTrimester is working with empty obj', function()
        {
            var resultado = lib.getValuesByTrimester(undefined);
            expect(resultado).to.be.undefined;
        })

        it('checks if getValuesByTrimester is working with zero values', function()
        {
            var obj = [{mes: "JANEIRO", valor: 0}, {mes: "Fevereiro", valor: 0}, {mes: "Março", valor: 0},
                       {mes: "Abril", valor: 0}, {mes: "Maio", valor: 0}, {mes: "Junho", valor: 0},
                       {mes: "Julho", valor: 0}, {mes: "Agosto", valor: 0}, {mes: "Setembro", valor: 0},
                       {mes: "Outubro", valor: 0}, {mes: "Novembro", valor: 0}, {mes: "Dezembro", valor: 0}];

            var resultado = lib.getValuesByTrimester(obj);

            expect(resultado.valorPrimeiroTrimestre).to.equal(0);
            expect(resultado.valorSegundoTrimestre).to.equal(0);
            expect(resultado.valorTerceiroTrimestre).to.equal(0);
            expect(resultado.valorQuartoTrimestre).to.equal(0);
        })

        it('checks if return trimester is returning the first trimester correctly', function()
        {
            var obj = [{mes: "Janeiro", valor: 1}, {mes: "Fevereiro", valor: 1}, {mes: "Março", valor: 11}];
            var resultado = lib.getValuesByTrimester(obj);

            expect(resultado.valorPrimeiroTrimestre).to.equal(13);
        })

        it('checks if return trimester is returning the second trimester correctly', function()
        {
            var obj = [{mes: "Abril", valor: 1}, {mes: "Maio", valor: 1}, {mes: "Junho", valor: 123123}];
            var resultado = lib.getValuesByTrimester(obj);

            expect(resultado.valorSegundoTrimestre).to.equal(123125);
        })

        it('checks if return trimester is returning the third trimester correctly', function()
        {
            var obj = [{mes: "Julho", valor: 1}, {mes: "Agosto", valor: 1}, {mes: "Setembro", valor: 123123}];
            var resultado = lib.getValuesByTrimester(obj);

            expect(resultado.valorTerceiroTrimestre).to.equal(123125);
        })

        it('checks if return trimester is returning the third trimester correctly', function()
        {
            var obj = [{mes: "Outubro", valor: 1}, {mes: "Novembro", valor: 1}, {mes: "Dezembro", valor: 123123}];
            var resultado = lib.getValuesByTrimester(obj);

            expect(resultado.valorQuartoTrimestre).to.equal(123125);
        })
    })

    describe('getMonthInDate', function()
    {
        it('should getMonthInDate even when wrong params are passed - should return undefined', function()
        {
            var _wrongParams = [null, undefined, true, false, function(){}, 1, 0, {}, []];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(lib.getMonthInDate(_wrongParams[i])).to.equal(undefined);
            }
        })

        it('checks getMonthInDate when the parameter is correct - January', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var janeiro = porcentagemAlunos[0];

            expect(janeiro.contador).to.equal(1);
            expect(janeiro.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - February', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('February, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var fevereiro = porcentagemAlunos[1];

            expect(fevereiro.contador).to.equal(1);
            expect(fevereiro.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - March', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('March, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var marco = porcentagemAlunos[2];

            expect(marco.contador).to.equal(1);
            expect(marco.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - April', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('April, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var abril = porcentagemAlunos[3];

            expect(abril.contador).to.equal(1);
            expect(abril.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - May', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('May, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var maio = porcentagemAlunos[4];

            expect(maio.contador).to.equal(1);
            expect(maio.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - June', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('June, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var junho = porcentagemAlunos[5];

            expect(junho.contador).to.equal(1);
            expect(junho.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - July', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('July, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var julho = porcentagemAlunos[6];

            expect(julho.contador).to.equal(1);
            expect(julho.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - August', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('August, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var agosto = porcentagemAlunos[7];

            expect(agosto.contador).to.equal(1);
            expect(agosto.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - September', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('September, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var setembro = porcentagemAlunos[8];

            expect(setembro.contador).to.equal(1);
            expect(setembro.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - October', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('October, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var outubro = porcentagemAlunos[9];

            expect(outubro.contador).to.equal(1);
            expect(outubro.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - November', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('November, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var novembro = porcentagemAlunos[10];

            expect(novembro.contador).to.equal(1);
            expect(novembro.porcentagem).to.equal(100);
        })

        it('checks getMonthInDate when the parameter is correct - December', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('December, 20 2014')}];
            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);
            var dezembro = porcentagemAlunos[11];

            expect(dezembro.contador).to.equal(1);
            expect(dezembro.porcentagem).to.equal(100);
        })

        it('checks if getMonthInDate is working when there are more than 3 months specified', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}, {registered: new Date('May, 20 2014')},
                                              {registered: new Date('June, 20 2014')}, {registered: new Date('December, 20 2014')}];

            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);

            var janeiro = porcentagemAlunos[0];
            var junho = porcentagemAlunos[5];
            var maio = porcentagemAlunos[4];
            var dezembro = porcentagemAlunos[11];

            expect(janeiro.contador).to.equal(1);
            expect(janeiro.porcentagem).to.equal(25);

            expect(junho.contador).to.equal(1);
            expect(junho.porcentagem).to.equal(25);

            expect(maio.contador).to.equal(1);
            expect(maio.porcentagem).to.equal(25);

            expect(dezembro.contador).to.equal(1);
            expect(dezembro.porcentagem).to.equal(25);
        })

        it('checks if getMonthInDate is working when there are more than one register for some month', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}, {registered: new Date('January, 20 2014')},
                                              {registered: new Date('January, 20 2014')}, {registered: new Date('January, 20 2014')},
                                              {registered: new Date('June, 20 2014')}];

            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);

            var janeiro = porcentagemAlunos[0];
            var junho = porcentagemAlunos[5];

            expect(janeiro.contador).to.equal(4);
            expect(janeiro.porcentagem).to.equal(80);

            expect(junho.contador).to.equal(1);
            expect(junho.porcentagem).to.equal(20);
        })

        it('checks if getMonthInDate is working when there are decimal percentage', function()
        {
            var objetoComInformacaoDeMeses = [{registered: new Date('January, 20 2014')}, {registered: new Date('February, 20 2014')},
                                              {registered: new Date('May, 20 2014')}];

            var porcentagemAlunos = lib.getMonthInDate(objetoComInformacaoDeMeses);

            var janeiro = porcentagemAlunos[0];
            var fevereiro = porcentagemAlunos[1];
            var maio = porcentagemAlunos[4];


            expect(janeiro.contador).to.equal(1);
            expect(janeiro.porcentagem).to.equal(33.33);

            expect(fevereiro.contador).to.equal(1);
            expect(fevereiro.porcentagem).to.equal(33.33);

            expect(maio.contador).to.equal(1);
            expect(maio.porcentagem).to.equal(33.33);
        })
    })

    describe('getPercentage', function()
    {
        it('checks if getPercentage is working with wrong parameters - should throw an error', function()
        {
            expect(function()
            {
                lib.getPercentage('not a number', {a: '1'})
            }).to.throw(Error, /Não é possível retornar porcentagem .+ numéricos/);

            expect(function()
            {
                lib.getPercentage(undefined, null)
            }).to.throw(Error, /Não é possível retornar porcentagem .+ não numéricos/);

            expect(function()
            {
                lib.getPercentage([], true)
            }).to.throw(Error,/Não é possível retornar porcentagem.+ não numéricos/);
        })

        it('checks if getPercentage is working with wrong parameters - should return 0', function()
        {
            expect(lib.getPercentage(0, 0)).to.equal(0);
            expect(lib.getPercentage(-1, -100)).to.equal(0);
        })

        it('checks if getPercentage is working with correct parameters', function()
        {
            expect(lib.getPercentage(1000, 1000)).to.equal(100);
            expect((lib.getPercentage(120, 20) >= 16) && (lib.getPercentage(120, 20) <= 17)).to.be.true;
        })
    })

    describe('isStringInvalid', function()
    {
        it('should return true - wrong string param', function()
        {
            var _wrongParams = [null, true, false, undefined, function(){}, {}, [], 1, 0, '    '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(lib.isStringInvalid(_wrongParams[i])).to.equal(true);
            }
        })

        it('should return false - right string params', function()
        {
            var _correctParams = ['a', '123', 'true', 'false', 'function(){}', '    a       '];

            for (var i = 0; i < _correctParams.length; i++)
            {
                expect(lib.isStringInvalid(_correctParams[i])).to.equal(false);
            }
        })
    })

    describe('isObjectInvalid', function()
    {
        it('should return true - wrong object param', function()
        {
            var _wrongParams = [null, true, false, undefined, function(){}, {}, [], 1, 0, '    '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(lib.isObjectInvalid(_wrongParams[i])).to.equal(true);
            }
        })

        it('should return false - right string params', function()
        {
            var _correctParams = [{a: 'b'}, {a: 1}, [{a: 1}]];

            for (var i = 0; i < _correctParams.length; i++)
            {
                expect(lib.isObjectInvalid(_correctParams[i])).to.equal(false);
            }
        })
    })

    describe('isFunctionInvalid', function()
    {
        it('should return true - wrong object param', function()
        {
            var _wrongParams = [null, true, false, undefined, {}, [], 1, 0, '    '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(lib.isFunctionInvalid(_wrongParams[i])).to.equal(true);
            }
        })

        it('should return false - right string params', function()
        {
            var _correctParams = [function(a){a()}, function a (b){function z (c){c()}}];

            for (var i = 0; i < _correctParams.length; i++)
            {
                expect(lib.isFunctionInvalid(_correctParams[i])).to.equal(false);
            }
        })
    })

    describe('isNumberInvalid', function()
    {
        it('should return true - wrong object param', function()
        {
            var _wrongParams = [null, true, false, undefined, {}, [], !1, !0, '    '];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(lib.isNumberInvalid(_wrongParams[i])).to.equal(true);
            }
        })

        it('should return false - right string params', function()
        {
            var _correctParams = [0, -1, -9999999999, 99999999, 2, 99, 3.14];

            for (var i = 0; i < _correctParams.length; i++)
            {
                expect(lib.isNumberInvalid(_correctParams[i])).to.equal(false);
            }
        })
    })
})