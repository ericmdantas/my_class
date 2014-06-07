"use strict";

var services = {};

services.pageConfig = function()
{
    var autor = "eric mendes dantas";

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

    return {
        author: autor,
        information: info
    }
}