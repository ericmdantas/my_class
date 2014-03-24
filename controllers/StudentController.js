"use strict";

var StudentModel = require('../models/Student');

function Student()
{
    function pegaInformacaoDeTodosAlunos(req, res)
    {
        var usuario = req.query.u;
        var student = new StudentModel();

        function callback(doc)
        {
            doc ? res.json({students: doc})
                : res.json({students: []});
        }

        student.findAllStudentsByUser(usuario, callback);
    }

    function pegaInformacaoTodosPagamentos(req, res)
    {
        var usuario = req.query.u;
        var student = new StudentModel();

        var callback = function(students)
        {
            students ? res.json({resultado: students})
                     : res.json({resultado: []})
        }

        student.findAllPaymentsByUser(usuario, callback);
    }

    function cadastraNovoEstudante(req, res)
    {
        var usuario = req.query.u;
        var aluno = req.body;
        var student = new StudentModel();

        student.registerNewStudent(usuario, aluno, function(){res.end()})
    }

    function fazPagamento(req, res)
    {
        var usuario = req.query.u;
        var pagamento = req.body;
        var student = new StudentModel();

        student.registerNewPayment(usuario, pagamento, function(){res.end()});
    }

    function editaAlunoEscolhido(req, res)
    {
        var usuario = req.query.u;
        var aluno = req.body;
        var student = new StudentModel();

        function callback()
        {
            res.end();
        }

        student.editStudent(usuario, aluno, callback);
    }

    function removeAlunoEscolhido(req, res)
    {
        var usuario = req.query.u;
        var identificacaoAluno = req.query.s;
        var student = new StudentModel();

        student.deleteStudent(usuario, identificacaoAluno, function(){res.end()});
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