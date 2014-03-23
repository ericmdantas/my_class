"use strict";

var TeacherModel = require('../models/teachers');

function Teacher()
{
    function getTeachersInfo(req, res)
    {
        var usuario = req.query.u;

        TeacherModel.findAllTeachersByUser(usuario, function(doc)
        {
            doc ? res.json({resultado: doc})
                : res.json({resultado: []})
        });
    }

    function registerTeacher(req, res)
    {
        var usuario = req.query.u;
        var professor = req.body;

        TeacherModel.registerNewTeacher(usuario, professor, function(){res.end()});
    }

    function editTeacher(req, res)
    {
        var usuario = req.query.u;
        var professor = req.body;

        function callback()
        {
            res.end();
        }

        TeacherModel.editTeacher(usuario, professor, callback);
    }

    function deleteTeacher(req, res)
    {
        var usuario = req.query.u;
        var identificacaoProfessor = req.query.p;
        TeacherModel.deleteTeacher(usuario, identificacaoProfessor, function(){res.end()});
    }

    return {
                getTeachersInfo: getTeachersInfo,
                registerTeacher: registerTeacher,
                editTeacher: editTeacher,
                deleteTeacher: deleteTeacher
           }
}

module.exports = new Teacher();