"use strict";

var StudentModel = require('../models/Student');

function Student()
{
    var _getInfoFromAllStudents = function(req, res)
    {
        var _onSuccess = function(students)
        {
            res.json(students);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _student = new StudentModel();

        _student
            .findAllStudentsByUser(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _getStudentsNames = function(req, res)
    {
        var _onSuccess = function(names)
        {
            res.json(names);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _student = new StudentModel();

        _student
            .findAllStudentsNames(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _getStudentsNamesByClass = function(req, res)
    {
        var _onSuccess = function(names)
        {
            res.json(names);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _turma = req.params.clazz;
        var _student = new StudentModel();

        _student
            .findAllStudentsNamesByClass(_usuario, _turma)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _getPaymentsInfo = function(req, res)
    {
        var _onSuccess = function(payments)
        {
            res.json(payments);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _student = new StudentModel();

        _student
            .findAllPaymentsByUser(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _registerStudent = function(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _aluno = req.body;
        var _student = new StudentModel();

        _student
            .registerStudent(_usuario, _aluno)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _registerPayment = function(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _pagamento = req.body;
        var _student = new StudentModel();

        _student
            .registerNewPayment(_usuario, _pagamento)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _editStudent = function(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _alunoID = req.params.id;
        var _aluno = req.body;
        var _student = new StudentModel();

        _student
            .editStudent(_usuario, _aluno, _alunoID)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _deleteStudent = function(req, res)
    {
        var _onSuccess = function()
        {
            res.send(200);
        }

        var _onError = function(error)
        {
            res.json(error);
        }

        var _onException = function(ex)
        {
            res.json(ex);
        }

        var _usuario = req.session.passport.user;
        var _identificacaoAluno = req.params.id;
        var _student = new StudentModel();

        _student
            .deleteStudent(_usuario, _identificacaoAluno)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    var _deletePayment = function(req, res)
    {
        var _onSuccess = function()
        {
            res
                .status(200)
                .end();
        }

        var _onError = function(error)
        {
            res.json(400, error);
        }

        var _onException = function(ex)
        {
            res.json(500, ex)
        };

        var _student = new StudentModel();

        var _user = req.session.passport.user;
        var _studentName = req.params.student;
        var _month = req.params.month;
        var _amount = req.params.amount;

        var _payment = {student: _studentName, month: _month, amount: _amount};

        _student
            .deletePayment(_user, _payment)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    return {
                getInfoFromAllStudents: _getInfoFromAllStudents,
                getStudentsNames: _getStudentsNames,
                getStudentsNamesByClass: _getStudentsNamesByClass,
                registerStudent: _registerStudent,
                editStudent: _editStudent,
                deleteStudent: _deleteStudent,
                getPaymentsInfo: _getPaymentsInfo,
                registerPayment: _registerPayment,
                deletePayment: _deletePayment
           }
}

module.exports = new Student();