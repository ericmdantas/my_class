"use strict";

describe('PAGECONFIG BEING TESTED', function()
{
    var pageConfig;

    beforeEach(module("myClass"));
    beforeEach(inject(function($injector)
    {
        pageConfig = $injector.get('pageConfig');
    }))

    describe('checks elements creation', function()
    {
        it('checks if pageConfig was created', function()
        {
            expect(pageConfig).toBeDefined();
        })

        it('checks if pageConfig.consts was created', function()
        {
            expect(pageConfig.lengthConstants).toBeDefined();
            expect(typeof pageConfig.lengthConstants).toBe("object");
        })

        it('checks if pageConfig.author was created', function()
        {
            expect(pageConfig.author).toBeDefined();
            expect(typeof pageConfig.author).toBeDefined("string");
        })

        it('checks if pageConfig.months was created', function()
        {
            expect(pageConfig.months).toBeDefined();
            expect(typeof pageConfig.months).toBeDefined("object");
        })

        it('checks if pageConfig.status was created', function()
        {
            expect(pageConfig.status).toBeDefined();
            expect(typeof pageConfig.status).toBe("object");
        })

        it('checks if pageConfig.information was created', function()
        {
            expect(pageConfig.information).toBeDefined();
            expect(typeof pageConfig.information).toBe("object");
        })

        it('checks if pageConfig.information was created', function()
        {
            expect(pageConfig.contracts).toBeDefined();
            expect(typeof pageConfig.contracts).toBe("object");
        })
    })

    describe('checks pageConfig\'s info', function()
    {
        it('the author should be eric mendes dantas', function()
        {
            expect(pageConfig.author).toEqual('eric mendes dantas');
        })

        it('should have all the status', function()
        {
            expect(pageConfig.status[0].nome).toEqual('interessado');
            expect(pageConfig.status[1].nome).toEqual('matriculado');
            expect(pageConfig.status[2].nome).toEqual('desistente');
            expect(pageConfig.status[3].nome).toEqual('outro');
        })

        it('should have all the months inside pageConfig.meses', function()
        {
            expect(pageConfig.months[0].nome).toEqual('Janeiro');
            expect(pageConfig.months[1].nome).toEqual('Fevereiro');
            expect(pageConfig.months[2].nome).toEqual('Março');
            expect(pageConfig.months[3].nome).toEqual('Abril');
            expect(pageConfig.months[4].nome).toEqual('Maio');
            expect(pageConfig.months[5].nome).toEqual('Junho');
            expect(pageConfig.months[6].nome).toEqual('Julho');
            expect(pageConfig.months[7].nome).toEqual('Agosto');
            expect(pageConfig.months[8].nome).toEqual('Setembro');
            expect(pageConfig.months[9].nome).toEqual('Outubro');
            expect(pageConfig.months[10].nome).toEqual('Novembro');
            expect(pageConfig.months[11].nome).toEqual('Dezembro');
        })

        it('should have all the constants for maxLength', function()
        {
            expect(pageConfig.lengthConstants.TAMANHO_CAMPO_NOME).toEqual('50');
            expect(pageConfig.lengthConstants.TAMANHO_CAMPO_ENDERECO).toEqual('50');
            expect(pageConfig.lengthConstants.TAMANHO_CAMPO_EMAIL).toEqual('30');
            expect(pageConfig.lengthConstants.TAMANHO_CAMPO_QUANTIA).toEqual('12');
            expect(pageConfig.lengthConstants.TAMANHO_CAMPO_TELEFONE).toEqual('11');
            expect(pageConfig.lengthConstants.TAMANHO_CAMPO_DATA).toEqual('10');
            expect(pageConfig.lengthConstants.TAMANHO_CAMPO_QUANTIDADE).toEqual('3');
        })
    })
})