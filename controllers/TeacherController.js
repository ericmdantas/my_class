"use strict";

var TeacherModel = require('../models/Teacher');
var ErrorHandler = require('../lib/ErrorHandler');

function Teacher()
{
    function getTeachersInfo(req, res)
    {
        var usuario = req.session.passport.user;
        var teacher = new TeacherModel();

        function callback(error, teachers)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta de professores'));
            }
            else
            {
                teachers ? res.json({resultado: teachers})
                         : res.json({resultado: []});
            }
        }

        teacher.findAllTeachersByUser(usuario, callback);
    }

    function getTeachersNames(req, res)
    {
        var usuario = req.session.passport.user;
        var teacher = new TeacherModel();

        function callback(error, teachers)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'consulta dos nomes dos professores'));
            }
            else
            {
                teachers ? res.json({resultado: teachers})
                         : res.json({resultado: []});
            }
        }

        teacher.findAllTeachersNames(usuario, callback);
    }

    function registerTeacher(req, res)
    {
        var usuario = req.session.passport.user;
        var professor = req.body;
        var teacher = new TeacherModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'cadastro de professor'));
            }
            else
                res.end();
        }

        teacher.registerNewTeacher(usuario, professor, callback);
    }

    function editTeacher(req, res)
    {
        var usuario = req.session.passport.user;
        var professor = req.body;
        var teacher = new TeacherModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'edição de professor'));
            }
            else
                res.end();
        }

        teacher.editTeacher(usuario, professor, callback);
    }

    function deleteTeacher(req, res)
    {
        var usuario = req.session.passport.user;
        var identificacaoProfessor = req.params.id;
        var teacher = new TeacherModel();

        function callback(error)
        {
            if (error)
            {
                var errorHandler = new ErrorHandler();
                res.json(500, errorHandler.createSimpleErrorObject(500, 'deleção de professor'));
            }
            else
                res.end();
        }

        teacher.deleteTeacher(usuario, identificacaoProfessor, callback);
    }

    return {
                getTeachersInfo: getTeachersInfo,
                getTeachersNames: getTeachersNames,
                registerTeacher: registerTeacher,
                editTeacher: editTeacher,
                deleteTeacher: deleteTeacher
           }
}

module.exports = new Teacher();