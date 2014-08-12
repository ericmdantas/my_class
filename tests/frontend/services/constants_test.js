"use strict";

describe('constants', function()
{
    var _inputMaxLength;
    var _contracts;
    var _months;
    var _studentStatus;
    var _baseAPI;
    var _author;

    beforeEach(module('myClass'));

    beforeEach(inject(function($injector)
    {
        _inputMaxLength = $injector.get('inputMaxLength');
        _contracts = $injector.get('contractsTypes');
        _months = $injector.get('months');
        _studentStatus = $injector.get('studentStatus');
        _baseAPI = $injector.get('baseAPI');
        _author = $injector.get('author');
    }))

    describe('checks elements creation', function()
    {
        it('should have inputMaxLength created', function()
        {
            expect(_inputMaxLength).toBeDefined();
        })

        it('should have contracts created', function()
        {
            expect(_contracts).toBeDefined();
            expect(_contracts.length).toBeGreaterThan(0);
        })

        it('should have studentStatus defined', function()
        {
            expect(_studentStatus).toBeDefined();
            expect(_studentStatus.length).toBeGreaterThan(0);
        })

        it('should have months defined', function()
        {
            expect(_months).toBeDefined();
            expect(_months.length).toEqual(12);
        })
    })

    describe('inputMaxLength', function()
    {
        it('should have all the sizes correctly set', function()
        {
            expect(_inputMaxLength.TAMANHO_CAMPO_QUANTIDADE).toEqual('3');
            expect(_inputMaxLength.TAMANHO_CAMPO_DATA).toEqual('10');
            expect(_inputMaxLength.TAMANHO_CAMPO_TELEFONE).toEqual('25');
            expect(_inputMaxLength.TAMANHO_CAMPO_QUANTIA).toEqual('12');
            expect(_inputMaxLength.TAMANHO_CAMPO_HORARIO).toEqual('22');
            expect(_inputMaxLength.TAMANHO_CAMPO_EMAIL).toEqual('60');
            expect(_inputMaxLength.TAMANHO_CAMPO_NOME).toEqual('80');
            expect(_inputMaxLength.TAMANHO_CAMPO_ENDERECO).toEqual('100');
        })
    })

    describe('contracts', function()
    {
        it('should have more than a few contracts declared and available', function()
        {
            expect(_contracts.length).toBeGreaterThan(3);
        })

        it('should have all the contracts defined correctly', function()
        {
            expect(_contracts[0].nome).toEqual('quinzenal');
            expect(_contracts[1].nome).toEqual('mensal');
            expect(_contracts[2].nome).toEqual('trimestral');
            expect(_contracts[3].nome).toEqual('semestral');
        })
    })

    describe('months', function()
    {
        it('should have all the months inside pageConfig.meses', function()
        {
            expect(_months[0].nome).toEqual('Janeiro');
            expect(_months[1].nome).toEqual('Fevereiro');
            expect(_months[2].nome).toEqual('Março');
            expect(_months[3].nome).toEqual('Abril');
            expect(_months[4].nome).toEqual('Maio');
            expect(_months[5].nome).toEqual('Junho');
            expect(_months[6].nome).toEqual('Julho');
            expect(_months[7].nome).toEqual('Agosto');
            expect(_months[8].nome).toEqual('Setembro');
            expect(_months[9].nome).toEqual('Outubro');
            expect(_months[10].nome).toEqual('Novembro');
            expect(_months[11].nome).toEqual('Dezembro');
        })
    })

    describe('studentStatus', function()
    {
        it('should have all the status defined', function()
        {
            expect(_studentStatus[0].nome).toEqual('interessado');
            expect(_studentStatus[1].nome).toEqual('matriculado');
            expect(_studentStatus[2].nome).toEqual('desistente');
            expect(_studentStatus[3].nome).toEqual('outro');
        })
    })

    describe('baseAPI', function()
    {
        it('should have the right path', function()
        {
            expect(_baseAPI).toBe('/api/protected/');
        })
    })

    describe('author', function()
    {
        it('should have the author name correct', function()
        {
            expect(_author.name).toBe('eric mendes dantas');
        })

        it('should have the github correct', function()
        {
            expect(_author.github).toBe('https://github.com/ericmdantas/my_class');
        })
    })
})