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
        aulas:
        {
            nome: "aulas",
            resumo: "gerencie informações como: professores que deram aulas, alunos presentes, matérias, etc.",
            classeBorda: 'border-left-color-avermelhado'
        },
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
        TAMANHO_CAMPO_NOME: "80",
        TAMANHO_CAMPO_ENDERECO: "100",
        TAMANHO_CAMPO_EMAIL: "60",
        TAMANHO_CAMPO_QUANTIA: "12",
        TAMANHO_CAMPO_TELEFONE: "25",
        TAMANHO_CAMPO_DATA: "10",
        TAMANHO_CAMPO_HORARIO: "22",
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