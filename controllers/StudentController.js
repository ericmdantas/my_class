"use strict";

var StudentModel = require('../models/Student');
var ErrorHandler = require('../lib/ErrorHandler');

function Student()
{
    function pegaInformacaoDeTodosAlunos(req, res)
    {
        var usuario = req.session.passport.user;
        var student = new StudentModel();

        function callback(error, students)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta de alunos'));
            }
            else
            {
                students ? res.json({students: students})
                         : res.json({students: []});
            }
        }

        student.findAllStudentsByUser(usuario, callback);
    }

    function pegaTodosOsNomesDeAlunos(req, res)
    {
        var usuario = req.session.passport.user;
        var turma = req.params.turma;
        var student = new StudentModel();

        function callback(error, students)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta de nomes de alunos'));
            }
            else
            {
                students ? res.json({students: students})
                         : res.json({students: []});
            }
        }

        student.findAllStudentsNames(usuario, turma, callback);
    }

    function pegaInformacaoTodosPagamentos(req, res)
    {
        var usuario = req.session.passport.user;
        var student = new StudentModel();

        var callback = function(error, students)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta de pagamentos'));
            }
            else
            {
                students ? res.json({resultado: students})
                         : res.json({resultado: []});
            }
        }

        student.findAllPaymentsByUser(usuario, callback);
    }

    function cadastraNovoEstudante(req, res)
    {
        var usuario = req.session.passport.user;
        var aluno = req.body;
        var student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'cadastro de aluno'));
            }
            else
                res.end();
        }

        student.registerStudent(usuario, aluno, callback)
    }

    function fazPagamento(req, res)
    {
        var usuario = req.session.passport.user;
        var pagamento = req.body;
        var student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'registrar pagamento'));
            }
            else
                res.end();
        }

        student.registerNewPayment(usuario, pagamento, callback);
    }

    function editaAlunoEscolhido(req, res)
    {
        var usuario = req.session.passport.user;
        var aluno = req.body;
        var student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'edição de aluno'));
            }
            else
                res.end();
        }

        student.editStudent(usuario, aluno, callback);
    }

    function removeAlunoEscolhido(req, res)
    {
        var usuario = req.session.passport.user;
        var identificacaoAluno = req.params.id;
        var student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'deleção de alunos'));
            }
            else
                res.end()
        }

        student.deleteStudent(usuario, identificacaoAluno, callback);
    }

    return {
                getInfoFromAllStudents: pegaInformacaoDeTodosAlunos,
                getStudentsNames: pegaTodosOsNomesDeAlunos,
                registerStudent: cadastraNovoEstudante,
                editStudent: editaAlunoEscolhido,
                deleteStudent: removeAlunoEscolhido,
                getPaymentsInfo: pegaInformacaoTodosPagamentos,
                registerPayment: fazPagamento
           }
}

module.exports = new Student();