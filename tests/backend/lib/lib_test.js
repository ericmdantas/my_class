var lib_backend = require('../../../lib/lib'),
    assert = require('assert');

describe('checks if lib\'s doing good', function()
{
    describe('checks creation', function()
    {
        it('checks if lib was created', function()
        {
            assert.equal(typeof lib_backend, "object");
            assert.equal(typeof lib_backend.getValuesByTrimester, "function");
            assert.equal(typeof lib_backend.getMonthInDate, "function");
            assert.equal(typeof lib_backend.getPercentage, "function");
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

            assert.equal(0, resultado.valorPrimeiroTrimestre);
            assert.equal(0, resultado.valorSegundoTrimestre);
            assert.equal(0, resultado.valorTerceiroTrimestre);
            assert.equal(0, resultado.valorQuartoTrimestre);
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

            assert.equal(123125, resultado.valorSegundoTrimestre);
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

            assert.equal(123125, resultado.valorQuartoTrimestre);
        })
    })

    describe('checks getMonthInDate', function()
    {
        it('checks if getMonthInDate is working when it receives a empty object', function()
        {
            assert.strictEqual(undefined, lib_backend.getMonthInDate({}));
        })

        it('checks if getMonthInDate is working when it receives a empty array', function()
        {
            assert.strictEqual(undefined, lib_backend.getMonthInDate([]));
        })

        it('checks if getMonthInDate is working when it receives null', function()
        {
            assert.strictEqual(undefined, lib_backend.getMonthInDate(null));
        })

        it('checks if getMonthInDate is working when it receives undefined', function()
        {
            assert.strictEqual(undefined, lib_backend.getMonthInDate(undefined));
            assert.strictEqual(undefined, lib_backend.getMonthInDate());
        })

        it('checks if getMonthInDate is working when it receives boolean', function()
        {
            assert.strictEqual(undefined, lib_backend.getMonthInDate(true));
            assert.strictEqual(undefined, lib_backend.getMonthInDate(false));
        })
    })

    describe('checks getPercentage', function()
    {
        it('checks if getPercentage is working with wrong parameters - should return 0', function()
        {
            assert.strictEqual(0, lib_backend.getPercentage('not a number', {a: '1'}));
            assert.strictEqual(0, lib_backend.getPercentage(undefined, null));
            assert.strictEqual(0, lib_backend.getPercentage([], true));
            assert.strictEqual(0, lib_backend.getPercentage(0, 0));
        })

        it('checks if getPercentage is working with correct parameters', function()
        {
            assert.strictEqual(100, lib_backend.getPercentage(1000, 1000));
            assert.strictEqual(true, (lib_backend.getPercentage(120, 20) >= 16) && (lib_backend.getPercentage(120, 20) <= 17));
        })
    })
})