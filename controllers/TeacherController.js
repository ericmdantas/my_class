"use strict";

var TeacherModel = require('../models/Teacher');
var ErrorHandler = require('../lib/ErrorHandler');

function Teacher()
{
    function _getTeachersInfo(req, res)
    {
        var _onSuccess = function(teachers)
        {
            res.json(teachers);
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
        var _teacher = new TeacherModel();

        _teacher
            .findAllTeachersByUser(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _getTeachersNames(req, res)
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
        var _teacher = new TeacherModel();

        _teacher
            .findAllTeachersNames(_usuario)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _registerTeacher(req, res)
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
        var _professor = req.body;
        var _teacher = new TeacherModel();

        _teacher
            .registerNewTeacher(_usuario, _professor)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _editTeacher(req, res)
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
        var _professorID = req.params.id;
        var _professor = req.body;
        var _teacher = new TeacherModel();

        _teacher
            .editTeacher(_usuario, _professor, _professorID)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    function _deleteTeacher(req, res)
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
        var _identificacaoProfessor = req.params.id;
        var _teacher = new TeacherModel();

        _teacher
            .deleteTeacher(_usuario, _identificacaoProfessor)
            .then(_onSuccess, _onError)
            .fail(_onException)
            .done();
    }

    return {
                getTeachersInfo: _getTeachersInfo,
                getTeachersNames: _getTeachersNames,
                registerTeacher: _registerTeacher,
                editTeacher: _editTeacher,
                deleteTeacher: _deleteTeacher
           }
}

module.exports = new Teacher();