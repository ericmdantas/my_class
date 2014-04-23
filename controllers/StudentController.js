"use strict";

var StudentModel = require('../models/Student');
var ErrorHandler = require('../lib/ErrorHandler');

function Student()
{
    function _getInfoFromAllStudents(req, res)
    {
        var _usuario = req.session.passport.user;
        var _student = new StudentModel();

        function callback(error, students)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta de alunos'));
            }
            else
            {
                students ? res.json({students: students})
                         : res.json({students: []});
            }
        }

        _student.findAllStudentsByUser(_usuario, callback);
    }

    function _getStudentsNames(req, res)
    {
        var _usuario = req.session.passport.user;
        var _student = new StudentModel();

        function callback(error, students)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta de nomes de alunos'));
            }
            else
            {
                students ? res.json({students: students})
                    : res.json({students: []});
            }
        }

        _student.findAllStudentsNames(_usuario, callback);
    }

    function _getStudentsNamesByClass(req, res)
    {
        var _usuario = req.session.passport.user;
        var _turma = req.params.clazz;
        var _student = new StudentModel();

        function callback(error, students)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta de nomes de alunos por turma'));
            }
            else
            {
                students ? res.json({students: students})
                         : res.json({students: []});
            }
        }

        _student.findAllStudentsNamesByClass(_usuario, _turma, callback);
    }

    function _getPaymentsInfo(req, res)
    {
        var _usuario = req.session.passport.user;
        var _student = new StudentModel();

        var callback = function(error, students)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta de pagamentos'));
            }
            else
            {
                students ? res.json({resultado: students})
                         : res.json({resultado: []});
            }
        }

        _student.findAllPaymentsByUser(_usuario, callback);
    }

    function _registerStudent(req, res)
    {
        var _usuario = req.session.passport.user;
        var _aluno = req.body;
        var _student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'cadastro de aluno'));
            }
            else
                res.end();
        }

        _student.registerStudent(_usuario, _aluno, callback)
    }

    function _registerPayment(req, res)
    {
        var _usuario = req.session.passport.user;
        var _pagamento = req.body;
        var _student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'registrar pagamento'));
            }
            else
                res.end();
        }

        _student.registerNewPayment(_usuario, _pagamento, callback);
    }

    function _editStudent(req, res)
    {
        var _usuario = req.session.passport.user;
        var _alunoID = req.params.id;
        var _aluno = req.body;
        var _student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'edição de aluno'));
            }
            else
                res.end();
        }

        _student.editStudent(_usuario, _aluno, _alunoID, callback);
    }

    function _deleteStudent(req, res)
    {
        var _usuario = req.session.passport.user;
        var _identificacaoAluno = req.params.id;
        var _student = new StudentModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'deleção de alunos'));
            }
            else
                res.end()
        }

        _student.deleteStudent(_usuario, _identificacaoAluno, callback);
    }

    return {
                getInfoFromAllStudents: _getInfoFromAllStudents,
                getStudentsNames: _getStudentsNames,
                getStudentsNamesByClass: _getStudentsNamesByClass,
                registerStudent: _registerStudent,
                editStudent: _editStudent,
                deleteStudent: _deleteStudent,
                getPaymentsInfo: _getPaymentsInfo,
                registerPayment: _registerPayment
           }
}

module.exports = new Student();