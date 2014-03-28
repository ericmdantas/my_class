'use strict';

var assert = require('assert');
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
            assert.strictEqual(typeof ErrorHandler, 'function');
        })

        it('checks if ErrorHandler\'s method createObjectError was created', function()
        {
            assert.strictEqual(typeof errorHandler.createSimpleErrorObject, 'function');
        })
    })

    describe('checks if createObjectError is working as expected', function()
    {
        it('should throw an error when parameters are not specified', function()
        {
            assert.throws(function(){errorHandler.createSimpleErrorObject(undefined, 'trecho')});
            assert.throws(function(){errorHandler.createSimpleErrorObject(1, undefined)});
            assert.throws(function(){errorHandler.createSimpleErrorObject()});
        })

        it('should return an object with default message and status', function()
        {
            assert.strictEqual(typeof errorHandler.createSimpleErrorObject(300, 'algum trecho'), 'object');
            assert.strictEqual(errorHandler.createSimpleErrorObject(300, 'algum trecho').errorMessage, 'Ocorreu um erro no processamento dos dados. ' + MENSAGEM_PADRAO);
            assert.strictEqual(errorHandler.createSimpleErrorObject(300, 'algum trecho').errorStatus, 'desconhecido');
        })

        it('should return an object with message and status for 500 error', function()
        {
            assert.strictEqual(errorHandler.createSimpleErrorObject(500, 'algum trecho').errorMessage, 'Houve um problema no ponto: algum trecho. ' + MENSAGEM_PADRAO);
            assert.strictEqual(errorHandler.createSimpleErrorObject(500, 'algum trecho').errorStatus, 500);
        })

        it('should return an object with message and status for 500 error', function()
        {
            assert.strictEqual(errorHandler.createSimpleErrorObject(404, 'algum trecho').errorMessage, 'O recurso solicitado não foi encontrado. ' + MENSAGEM_PADRAO);
            assert.strictEqual(errorHandler.createSimpleErrorObject(404, 'algum trecho').errorStatus, 404);
        })
    })
})