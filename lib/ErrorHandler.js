'use strict';

//errorHandler

function ErrorHandler()
{
    function criaObjetoDeErroSimples(status, trecho)
    {
        if ((!status) || (!trecho))
            throw new Error('Parâmetros status e trecho não informados.');

        var mensagemFinal = '';
        var errorObject = {errorMessage: '', errorStatus: 'unknown'};
        var MENSAGEM_PADRAO = 'Por favor, tente novamente mais tarde';

        switch(status)
        {
            case 404: mensagemFinal = 'O recurso solicitado não foi encontrado. ' + MENSAGEM_PADRAO;
                      errorObject.errorMessage = mensagemFinal;
                      errorObject.errorStatus = 404;
                      break;

            case 500: mensagemFinal = 'Houve um problema no ponto: '+trecho+'. ' + MENSAGEM_PADRAO;
                      errorObject.errorMessage = mensagemFinal;
                      errorObject.errorStatus = 500;
                      break;

            default: mensagemFinal = 'Ocorreu um erro no processamento dos dados. ' + MENSAGEM_PADRAO;
                     errorObject.errorMessage = mensagemFinal;
                     errorObject.errorStatus = 'desconhecido';
                     break;
        }

        return errorObject;
    }

    return {
                createSimpleErrorObject: criaObjetoDeErroSimples
           }
}

module.exports = ErrorHandler;