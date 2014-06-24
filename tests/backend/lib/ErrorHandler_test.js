'use strict';

var expect = require('chai').expect;
var ErrorHandler = require('../../../lib/ErrorHandler');

describe('errorHandler being tested', function()
{
    var errorHandler;
    var MENSAGEM_PADRAO = 'Por favor, tente novamente mais tarde';

    beforeEach(function()
    {
        errorHandler = new ErrorHandler();
    })

    describe('checks elements creation', function()
    {
        it('checks if ErrorHandler was created', function()
        {
            expect(ErrorHandler).to.be.defined;
            expect(ErrorHandler).to.be.a('function');
        })

        it('checks if ErrorHandler\'s method createObjectError was created', function()
        {
            expect(errorHandler.createSimpleErrorObject).to.be.defined;
            expect(errorHandler.createSimpleErrorObject).to.be.a('function');
        })
    })

    describe('checks if createObjectError is working as expected', function()
    {
        it('should throw an error when parameters are not specified', function()
        {
            var _wrongParams = [null, undefined];

            for (var i = 0; i < _wrongParams.length; i++)
            {
                expect(function()
                {
                    errorHandler.createSimpleErrorObject(_wrongParams[i], 'trecho');
                }).to.throw(Error);
            }
        })

        it('should return an object with default message and status', function()
        {
            expect(errorHandler.createSimpleErrorObject(300, 'algum trecho')).to.be.an('object');
            expect(errorHandler.createSimpleErrorObject(300, 'algum trecho').errorMessage).to.equal('Ocorreu um erro no processamento dos dados. ' + MENSAGEM_PADRAO);
            expect(errorHandler.createSimpleErrorObject(300, 'algum trecho').errorStatus).to.equal('desconhecido');
        })

        it('should return an object with message and status for 500 error', function()
        {
            expect(errorHandler.createSimpleErrorObject(500, 'algum trecho').errorMessage).to.equal('Houve um problema no ponto: algum trecho. ' + MENSAGEM_PADRAO)
            expect(errorHandler.createSimpleErrorObject(500, 'algum trecho').errorStatus).to.equal(500);
        })

        it('should return an object with message and status for 500 error', function()
        {
            expect(errorHandler.createSimpleErrorObject(404, 'algum trecho').errorMessage).to.equal('O recurso solicitado não foi encontrado. ' + MENSAGEM_PADRAO);
            expect(errorHandler.createSimpleErrorObject(404, 'algum trecho').errorStatus).to.equal(404);
        })
    })
})