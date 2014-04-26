"use strict";

describe('ModalHelper', function()
{
    var ModalHelper;

    beforeEach(module('myClass'));
    beforeEach(inject(function($injector)
    {
        ModalHelper = $injector.get('ModalHelper');
    }))

    describe('checks elements creation', function()
    {
        it('checks if open was created', function()
        {
            expect(ModalHelper.open).toBeDefined();
            expect(typeof ModalHelper.open).toEqual('function');
        })

        it('checks if close was created', function()
        {
            expect(ModalHelper.close).toBeDefined();
            expect(typeof ModalHelper.close).toEqual('function');
        })
    })

    describe('open', function()
    {
        it('should throw error - wrong id param', function()
        {
            var _wrongParams = ['', true, false, [], {}, 'modal', function(){}, 1, 0, undefined, null];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    ModalHelper.open(_wrongParams[i]);
                }).toThrow(new Error('Não será possível fechar o modal. ID informado de forma incorreta'));
            }
        })

        it('should open modal correctly', function()
        {
            var _modalID = '#modal';
            ModalHelper.open(_modalID);
        })
    })

    describe('close', function()
    {
        it('should throw error - wrong id param', function()
        {
            var _wrongParams = ['', true, false, [], {}, 'modal', function(){}, 1, 0, undefined, null];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    ModalHelper.close(_wrongParams[i]);
                }).toThrow(new Error('Não será possível fechar o modal. ID informado de forma incorreta'));
            }
        })

        it('should close modal correctly', function()
        {
            var _modalID = '#modal';
            ModalHelper.close(_modalID);
        })
    })
})