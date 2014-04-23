"use strict";

var TeacherModel = require('../models/Teacher');
var ErrorHandler = require('../lib/ErrorHandler');

function Teacher()
{
    function _getTeachersInfo(req, res)
    {
        var _usuario = req.session.passport.user;
        var _teacher = new TeacherModel();

        function callback(error, teachers)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta de professores'));
            }
            else
            {
                teachers ? res.json({resultado: teachers})
                         : res.json({resultado: []});
            }
        }

        _teacher.findAllTeachersByUser(_usuario, callback);
    }

    function _getTeachersNames(req, res)
    {
        var _usuario = req.session.passport.user;
        var _teacher = new TeacherModel();

        function callback(error, teachers)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'consulta dos nomes dos professores'));
            }
            else
            {
                teachers ? res.json({resultado: teachers})
                         : res.json({resultado: []});
            }
        }

        _teacher.findAllTeachersNames(_usuario, callback);
    }

    function _registerTeacher(req, res)
    {
        var _usuario = req.session.passport.user;
        var _professor = req.body;
        var _teacher = new TeacherModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'cadastro de professor'));
            }
            else
                res.end();
        }

        _teacher.registerNewTeacher(_usuario, _professor, callback);
    }

    function _editTeacher(req, res)
    {
        var _usuario = req.session.passport.user;
        var _professorID = req.params.id;
        var _professor = req.body;
        var _teacher = new TeacherModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'edição de professor'));
            }
            else
                res.end();
        }

        _teacher.editTeacher(_usuario, _professor, _professorID, callback);
    }

    function _deleteTeacher(req, res)
    {
        var _usuario = req.session.passport.user;
        var _identificacaoProfessor = req.params.id;
        var _teacher = new TeacherModel();

        function callback(error)
        {
            if (error)
            {
                var _errorHandler = new ErrorHandler();
                res.json(500, _errorHandler.createSimpleErrorObject(500, 'deleção de professor'));
            }
            else
                res.end();
        }

        _teacher.deleteTeacher(_usuario, _identificacaoProfessor, callback);
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