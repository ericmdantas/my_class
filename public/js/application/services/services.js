"use strict";

var services = {};

services.pageConfig = function()
{
    var autor = "eric mendes dantas";
    var contratos = [{nome:"quinzenal"}, {nome: "mensal"}, {nome: "trimestral"}, {nome: "semestral"}];
    var status = [{nome: "interessado"}, {nome: "matriculado"}, {nome: "desistente"}, {nome: "outro"}];
    var meses =  [{nome: "Janeiro", numero: 1},  {nome: "Fevereiro", numero: 2}, {nome: "Março", numero: 3},
                  {nome: "Abril", numero: 4},    {nome: "Maio", numero: 5},      {nome: "Junho", numero: 6},
                  {nome: "Julho", numero: 7},    {nome: "Agosto", numero: 8},    {nome: "Setembro", numero: 9},
                  {nome: "Outubro", numero: 10}, {nome: "Novembro", numero: 11}, {nome: "Dezembro", numero: 12}];

    var info =
    {
        turmas:
        {
            nome: "turmas",
            resumo: "gerencie informações como: nível, número de alunos, horário, histórico, etc.",
            classeBorda: 'border-left-color-verde'
        },
        professores:
        {
            nome: "professores",
            resumo: "gerencie informações como: número de professores, aulas dadas, salário, tempo de casa, etc.",
            classeBorda: 'border-left-color-rosa'
        },
        alunos:
        {
            nome: "alunos",
            resumo: "gerencie informações como: nome, idade, email, telefone, endereço, status, etc.",
            classeBorda: 'border-left-color-azul'
        },
        livros:
        {
            nome: "livros",
            resumo: "gerencie informações como: quantidade de livros em estoque, nome dos mesmos, etc.",
            classeBorda: 'border-left-color-marrom'
        },
        pagamentos:
        {
            nome: "pagamentos",
            resumo: "gerencie informações como: aluno que pagou, forma de pagamento, quantia, data, etc.",
            classeBorda: 'border-left-color-laranja'
        },
        estatisticas:
        {
            nome: "estatisticas",
            resumo: "gerencie informações como: números de alunos cadastrados por mês, períodos de melhor arrecadação, etc.",
            classeBorda: 'border-left-color-roxo'
        }
    };

    var constantesDeTamanho =
    {
        TAMANHO_CAMPO_NOME: "50",
        TAMANHO_CAMPO_ENDERECO: "50",
        TAMANHO_CAMPO_EMAIL: "30",
        TAMANHO_CAMPO_QUANTIA: "12",
        TAMANHO_CAMPO_TELEFONE: "11",
        TAMANHO_CAMPO_DATA: "10",
        TAMANHO_CAMPO_HORARIO: "5",
        TAMANHO_CAMPO_QUANTIDADE: "3"
    }

    return {
        author: autor,
        information: info,
        lengthConstants: constantesDeTamanho,
        months: meses,
        status: status,
        contracts: contratos
    }
}


services.lib = function()
{
    function removeEspacosEmBranco(obj)
    {
        if ((!obj) || ("object" !== typeof obj) || (!Object.keys(obj).length))
            throw new Error('problema na remoção de espaços em branco (obj == undefined)');

        for (var i in obj)
        {
            if ("string" === typeof obj[i])
                obj[i] = obj[i].trim();
        }

        return obj;
    }

    function criaAlerta(status, mensagem)
    {
        if ($('.alert').length)
            return;

        var problemaStatus = status || 'desconhecido';
        var problemaMensagem = mensagem || 'Aconteceu algo inesperado. Por favor, tente novamente mais tarde ';
        var mensagemCompleta = problemaMensagem + ' ('+problemaStatus+').';


        $('#warning').append('<div class="alert alert-danger fade in created centered">'+
                                  '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
                                  '<strong>Oops!</strong> '+mensagemCompleta+
                             '</div>');

        $('.alert').alert();
    }

    return {
        removeWhiteSpaces: removeEspacosEmBranco,
        createAlert: criaAlerta
    }
}