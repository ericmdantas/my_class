"use strict";

var StudentModel = require('../models/students');

function Student()
{
    function pegaInformacaoDeTodosAlunos(req, res)
    {
        var usuario = req.query.u;

        function callback(doc)
        {
            doc ? res.json({students: doc})
                : res.json({students: []});
        }

        StudentModel.findAllStudentsByUser(usuario, callback);
    }

    function pegaInformacaoTodosPagamentos(req, res)
    {
        var usuario = req.query.u;

        var callback = function(doc)
        {
            doc ? res.json({resultado: doc.students})
                : res.json({resultado: []})
        }

        StudentModel.findAllPaymentsByUser(usuario, callback);
    }

    function cadastraNovoEstudante(req, res)
    {
        var usuario = req.query.u;
        var aluno = req.body;

        StudentModel.registerNewStudent(usuario, aluno, function(){res.end()})
    }

    function fazPagamento(req, res)
    {
        var usuario = req.query.u;
        var pagamento = req.body;
        StudentModel.registerNewPayment(usuario, pagamento, function(){res.end()});
    }

    function editaAlunoEscolhido(req, res)
    {
        var usuario = req.query.u;
        var aluno = req.body;

        function callback()
        {
            res.end();
        }

        StudentModel.editStudent(usuario, aluno, callback);
    }

    function removeAlunoEscolhido(req, res)
    {
        var usuario = req.query.u;
        var identificacaoAluno = req.query.s;
        StudentModel.deleteStudent(usuario, identificacaoAluno, function(){res.end()});
    }

    return {
                getInfoFromAllStudents: pegaInformacaoDeTodosAlunos,
                registerStudent: cadastraNovoEstudante,
                editStudent: editaAlunoEscolhido,
                deleteStudent: removeAlunoEscolhido,
                getPaymentsInfo: pegaInformacaoTodosPagamentos,
                registerPayment: fazPagamento
           }
}

module.exports = new Student();