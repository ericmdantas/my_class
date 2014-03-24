"use strict";

var TeacherModel = require('../models/Teacher');

function Teacher()
{
    function getTeachersInfo(req, res)
    {
        var usuario = req.query.u;
        var teacher = new TeacherModel();

        teacher.findAllTeachersByUser(usuario, function(teachers)
        {
            teachers ? res.json({resultado: teachers})
                     : res.json({resultado: []})
        });
    }

    function registerTeacher(req, res)
    {
        var usuario = req.query.u;
        var professor = req.body;
        var teacher = new TeacherModel();

        teacher.registerNewTeacher(usuario, professor, function(){res.end()});
    }

    function editTeacher(req, res)
    {
        var usuario = req.query.u;
        var professor = req.body;
        var teacher = new TeacherModel();

        function callback()
        {
            res.end();
        }

        teacher.editTeacher(usuario, professor, callback);
    }

    function deleteTeacher(req, res)
    {
        var usuario = req.query.u;
        var identificacaoProfessor = req.query.p;
        var teacher = new TeacherModel();

        teacher.deleteTeacher(usuario, identificacaoProfessor, function(){res.end()});
    }

    return {
                getTeachersInfo: getTeachersInfo,
                registerTeacher: registerTeacher,
                editTeacher: editTeacher,
                deleteTeacher: deleteTeacher
           }
}

module.exports = new Teacher();